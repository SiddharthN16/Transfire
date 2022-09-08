import { useState } from 'react';
import {
  FormLabel,
  Stack,
  Button,
  Input,
  Center,
  useToast,
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';

import { storage, firestore } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../AuthContext';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

const GroupUpload = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [fileState, setFileState] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileTypes = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'text/plain',
  ];

  const showToast = (type, err) => {
    toast({
      title: `${err}`,
      position: 'top-right',
      isClosable: true,
      status: `${type}`,
      duration: '2500',
    });
  };

  const fileChange = e => {
    e.preventDefault();

    if (e.target.files.length != 0) setFileState(true);
    else setFileState(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let file = e.target[0].files[0];
    if (!file) {
      setFileState(false);

      showToast('error', 'No File Selected');
      return;
    } else if (!fileTypes.includes(file.type)) {
      setFileState(false);

      showToast('error', 'Invalid File Type');
      return;
    }
    uploadFile(file);
    setLoading(true);
    e.target.reset();
  };

  const uploadFile = async currFile => {
    if (!currFile) return;

    const filePath = `/${groupId}/${currFile.name}`;
    const storageRef = ref(storage, filePath);
    const fileDoc = doc(firestore, `${groupId}/${currFile.name}`);

    const fileSnapshot = await getDoc(fileDoc);

    if (fileSnapshot.exists()) {
      showToast('error', 'File Already Exists');
      setFileState(false);
      setLoading(false);
      return;
    } else {
      const uploadTask = uploadBytesResumable(storageRef, currFile);

      uploadTask.on(
        'state_changed',
        snapshot => {
          return;
        },
        err => {
          showToast('error', err.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(fileURL => {
              setFileData(fileDoc, currFile, filePath, fileURL);
            })
            .catch(err => {
              showToast('error', err.code);
            });
        }
      );
    }
  };

  const setFileData = (fileDoc, currFile, filePath, fileURL) => {
    const fileData = {
      fileName: currFile.name,
      fileSize: currFile.size,
      filePath: filePath,
      fileURL: fileURL,
      fileDate: serverTimestamp(),
      fileType: currFile.type,
      userPosted: user.uid,
    };

    setDoc(fileDoc, fileData)
      .then(() => {
        showToast('success', 'File Uploaded');
        setFileState(false);
        setLoading(false);
      })
      .catch(err => {
        showToast('error', err.code);
      });
  };

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <Stack direction={'row'} align="center" my={4}>
          <Button
            as={FormLabel}
            cursor="pointer"
            colorScheme={!fileState ? 'blue' : 'green'}
            w={48}
            h={14}
            mt={2}
          >
            <Input
              type="file"
              accept={fileTypes.join(',')}
              onChange={fileChange}
              multiple={false}
              hidden
            />
            {!fileState ? 'Select File' : 'File Selected'}
          </Button>
          <Button
            type="submit"
            isLoading={loading}
            loadingText={'Uploading'}
            w={32}
            h={14}
          >
            Upload
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

export default GroupUpload;

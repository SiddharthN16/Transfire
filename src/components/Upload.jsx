import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
  Box,
  Flex,
  Center,
  useToast,
  Heading,
  Container,
} from '@chakra-ui/react';

import { storage } from '../firebase';
import {
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAuth } from '../AuthContext';

const Upload = () => {
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

    console.log(e.target.files);
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

  const uploadFile = currFile => {
    if (!currFile) return;

    const storageRef = ref(storage, `/${user.uid}/${currFile.name}`);

    getDownloadURL(storageRef)
      .then(() => {
        showToast('error', 'File Already Exists');
        setLoading(false);
        return;
      })
      .catch(() => {
        const uploadTask = uploadBytesResumable(storageRef, currFile);

        uploadTask.on(
          'state_changed',
          snapshot => {
            return;
          },
          err => {
            showToast(err.code);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(url => {
                console.log(url);
                showToast('success', 'File Uploaded');
                setFileState(false);
                setLoading(false);
              })
              .catch(err => {
                showToast('error', err.code);
              });
          }
        );
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

export default Upload;

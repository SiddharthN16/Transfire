import { useParams } from 'react-router-dom';

const Test = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <p>This is a page for ${id}</p>
    </>
  );
};

export default Test;

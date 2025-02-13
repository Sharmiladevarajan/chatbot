import parse from 'html-react-parser';

const HTMLContent = ( data :any) => {
    console.log(data,"html");
    
  return <div>{parse(data?.value)}</div>;
};
export default HTMLContent
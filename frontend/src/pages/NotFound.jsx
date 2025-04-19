import notFoundImg from '../assests/notFound.png';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <img src={notFoundImg} alt="Page Not Found" className="w-1/2 bg-transparent" />
    </div>
  );
};
 export default NotFound;
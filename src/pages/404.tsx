import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div>
      <h1 className="text-2xl">404 Not Found</h1>
      <p className="text-xl">Can not find the page</p>
      <p className="text-xl">"{location.pathname}"</p>
    </div>
  );
};

export default NotFound;

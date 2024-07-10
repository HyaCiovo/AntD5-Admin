import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h1>404 NotFound</h1>
      <p>Can not find the page</p>
      <p>{location.pathname}</p>
    </div>
  );
};

export default NotFound;
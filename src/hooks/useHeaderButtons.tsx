import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useOnRoutesChange = (func: () => void) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [changes, setChanges] = useState({ from: "/", to: "/" })

  useEffect(
    () => {
      if (location.pathname === '/')
        return navigate('/user', { replace: true })
      setChanges({ from: changes.to, to: location.pathname })
      func()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  return { from: changes.from, to: changes.to }
};

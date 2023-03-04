import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser, reset } from "../features/user/user";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(reset());
    dispatch(getUser());
  }, []);

  if (isSuccess && !isLoading) return <>{children}</>;
  else if (isError && !isLoading) return <Navigate to='/login' />;
  else return <Loader />;
};
export default ProtectedRoute;

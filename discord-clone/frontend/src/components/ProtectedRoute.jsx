import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser, reset } from "../features/user/user";
import Loader from "./Loader";
import Nav from "./Nav";

const Layout = ({ user, children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Nav user={user} />
      <div className='mt-8 p-2 flex-1'>{children}</div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, user } = useSelector(
    ({ user }) => user
  );

  useEffect(() => {
    dispatch(reset());
    dispatch(getUser());
  }, []);

  if (isSuccess && !isLoading) return <Layout user={user}>{children}</Layout>;
  else if (isError && !isLoading) return <Navigate to='/login' />;
  else return <Loader />;
};
export default ProtectedRoute;

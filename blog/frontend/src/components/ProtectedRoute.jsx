import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser, reset } from "../features/user/user";
import Loader from "./Loader";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Layout = ({ user, children }) => {
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-primary flex justify-between items-center px-2 py-5'>
        <Link to='/'>
          <h1 className='text-2xl font-bold uppercase text-white'>Blog</h1>
        </Link>
        <div className='bg-white rounded p-2 flex justify-between items-center cursor-pointer'>
          <h2 className='uppercase underline text-sm'>{user.name}</h2>
          <IoIosNotificationsOutline />
          <AiOutlineLogout className='ml-5' onClick={handelLogout} />
        </div>
      </header>
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

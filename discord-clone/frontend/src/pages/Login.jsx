import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser, login, reset } from "../features/user/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const Login = () => {
  const INITIAL = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, successMessage, errorsMessage, user } =
    useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(reset());
    dispatch(getUser());
  }, []);

  const handelLogin = async (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess && !isLoading && data.email) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success(successMessage);
    } else if (isError && !isLoading)
      errorsMessage?.forEach((message) => toast.error(message));
  }, [isSuccess, isError, isLoading]);
  return (
    <>
      {isLoading && <Loader />}
      {user && <Navigate to='/' />}
      <div className='h-screen bg-primary w-full flex justify-center items-center'>
        <form className='w-full max-w-[500px] bg-custom-black p-3 rounded'>
          <h1 className='text-3xl text-center mb-3 text-white'>Welcome back</h1>
          <div className='flex flex-col gap-2 mb-3'>
            <label htmlFor='email' className='text-white'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='p-1 px-2 rounded'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2 mb-3'>
            <label htmlFor='Password' className='text-white'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='username'
              className='p-1 px-2 rounded'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2 my-3 mt-6'>
            <button className='bg-primary text-white p-2' onClick={handelLogin}>
              Continue
            </button>
          </div>
          <p className='text-gray-400'>
            Need an account?
            <Link className='text-primary ml-2 hover:underline' to='/register'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;

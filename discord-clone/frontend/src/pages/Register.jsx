import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/user/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const INITIAL = {
    username: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, successMessage, errorsMessage } =
    useSelector(({ user }) => user);

  const handelRegister = async (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(register(data));
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
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
      <div className='h-screen bg-primary w-full flex justify-center items-center'>
        <form className='w-full max-w-[500px] bg-custom-black p-3 rounded'>
          <h1 className='text-3xl text-center mb-3 text-white'>
            Create an account
          </h1>
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
            <label htmlFor='email' className='text-white'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='p-1 px-2 rounded'
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
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
            <button
              className='bg-primary text-white p-2'
              onClick={handelRegister}
            >
              Continue
            </button>
          </div>
          <Link className='text-primary hover:underline' to='/login'>
            Already have an account?
          </Link>
        </form>
      </div>
    </>
  );
};
export default Register;

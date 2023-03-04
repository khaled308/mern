import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isEmail } from "../utils/validate";
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
  const [valid, setValid] = useState(false);
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

      <div className='flex justify-center items-center h-screen bg-primary px-4'>
        <div className='bg-white p-5 w-full shadow-lg text-center md:w-1/2'>
          <h1 className='text-3xl mb-5'>Login</h1>
          <form>
            <input
              type='email'
              className='input'
              placeholder='Enter Your Email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onBlur={(e) => setValid(isEmail(e.target.value))}
            />

            <input
              type='password'
              className='input'
              placeholder='Enter Your Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              className='btn-form my-4'
              disabled={!valid}
              onClick={handelLogin}
            >
              Login
            </button>
            <p>
              Don't have an Account?{" "}
              <Link className='text-primary underline' to='/register'>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;

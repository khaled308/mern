import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmail } from "../utils/validate";
import { register, reset } from "../features/user/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const INITIAL = {
    name: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL);
  const [valid, setValid] = useState(false);
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
      errorsMessage.forEach((message) => toast.error(message));
  }, [isSuccess, isError, isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center h-screen bg-primary px-4'>
        <div className='bg-white p-5 w-full shadow-lg text-center md:w-1/2'>
          <h1 className='text-3xl mb-5'>Register</h1>
          <form>
            <input
              type='text'
              className='input'
              placeholder='Enter Your name'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

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
              onClick={handelRegister}
            >
              Register
            </button>
            <p>
              Already have an Account?{" "}
              <Link className='text-primary underline' to='/login'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;

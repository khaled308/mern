import { useState } from "react";
import { Link } from "react-router-dom";
import { isEmail } from "../utils/validate";
import { registerService } from "../features/user/userApi";
import { toast } from "react-hot-toast";

const Register = () => {
  const INITIAL = {
    name: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL);
  const [valid, setValid] = useState(false);

  const handelRegister = async (e) => {
    e.preventDefault();
    const { success, message } = await registerService(data);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  return (
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
  );
};
export default Register;

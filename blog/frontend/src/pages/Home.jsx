import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs, reset } from "../features/blog/blog";
import Loader from "../components/Loader";
import Card from "../components/Card";

const Home = () => {
  const { user } = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, blogs } = useSelector(({ blog }) => blog);

  const handelClick = () => {
    navigate("/add-blog");
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getBlogs());
  }, []);
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-2xl uppercase'>welcome {user.name}!</h2>
        <button className='p-2 border' onClick={handelClick}>
          Add Blog
        </button>
      </div>

      <div className='flex flex-wrap gap-3'>
        {isLoading && <Loader />}
        {blogs.map((item) => (
          <Card
            key={item._id}
            data={item}
            className='flex-1 cursor-pointer'
            onClick={() => navigate(`/blogs/${item._id}`)}
          />
        ))}
      </div>
    </>
  );
};
export default Home;

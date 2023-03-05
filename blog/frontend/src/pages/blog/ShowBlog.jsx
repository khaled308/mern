import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, getBlog, reset } from "../../features/blog/blog";
import Loader from "../../components/Loader";
import NotFound from "../NotFound";
import ReactHtmlParser from "react-html-parser";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ShowBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, blog, isError } = useSelector(({ blog }) => blog);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    dispatch(reset());
    dispatch(getBlog(id));
  }, []);

  useEffect(() => {
    if (finished) navigate("/");
  }, [finished]);
  const handelDelete = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(deleteBlog(id));
    setFinished(true);
  };
  return (
    <>
      {isLoading && <Loader />}
      {isError ? (
        <NotFound />
      ) : (
        <>
          <div className='mb-5'>
            <div className='flex justify-end gap-3'>
              <button
                className='bg-primary p-2 px-4 text-white rounded'
                onClick={() => navigate(`/blogs/${id}/edit`)}
              >
                Edit
              </button>
              <button
                className='p-2 px-4 border rounded'
                onClick={handelDelete}
              >
                Delete
              </button>
            </div>
            <h1 className='text-center text-3xl'>{blog.title}</h1>
          </div>
          <div>
            {blog.content &&
              ReactHtmlParser(draftToHtml(JSON.parse(blog.content)))}
          </div>
        </>
      )}
    </>
  );
};
export default ShowBlog;

import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import BlogForm from "../../components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, reset } from "../../features/blog/blog";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const INITIAL_STATE = {
    title: "",
    description: "",
    content: EditorState.createEmpty(),
  };

  const [blog, setBlog] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, successMessage, errorsMessage } =
    useSelector(({ blog }) => blog);
  const navigate = useNavigate();

  const handelSave = (e) => {
    e.preventDefault();
    let content = blog.content.getCurrentContent();
    content = JSON.stringify(convertToRaw(content));
    dispatch(addBlog({ ...blog, content }));
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess && blog.title) {
      toast.success(successMessage);
      navigate("/");
    } else if (isError && !isLoading)
      errorsMessage.forEach((message) => toast.error(message));
  }, [isLoading, isError, isSuccess]);
  return (
    <>
      {isLoading && <Loader />}
      <BlogForm blog={blog} setBlog={setBlog} handelSave={handelSave} />
    </>
  );
};
export default AddBlog;

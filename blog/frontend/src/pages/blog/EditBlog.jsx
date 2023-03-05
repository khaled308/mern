import { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import BlogForm from "../../components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { editBlog, getBlog, reset } from "../../features/blog/blog";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import NotFound from "../NotFound";

const EditBlog = () => {
  const INITIAL_STATE = {
    title: "",
    description: "",
    content: EditorState.createEmpty(),
  };
  const { id } = useParams();
  const [blogData, setBlog] = useState(INITIAL_STATE);
  const [finished, setFinished] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, successMessage, errorsMessage, blog } =
    useSelector(({ blog }) => blog);
  const navigate = useNavigate();

  const handelSave = (e) => {
    e.preventDefault();
    let content = blogData.content.getCurrentContent();
    content = JSON.stringify(convertToRaw(content));
    const data = {
      blog: { ...blog, ...blogData, content },
      id,
    };
    dispatch(reset());
    dispatch(editBlog(data));
    setFinished(true);
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getBlog(id));
  }, []);

  useEffect(() => {
    if (blog && blog.content) {
      const content = convertFromRaw(JSON.parse(blog.content));
      setBlog({
        title: blog.title,
        description: blog.description,
        content: EditorState.createWithContent(content),
      });
    }
    if (!isLoading && isSuccess && finished) {
      toast.success(successMessage);
      navigate("/");
    } else if (isError && !isLoading && finished)
      errorsMessage.forEach((message) => toast.error(message));
  }, [isLoading, isError, isSuccess, blog]);
  return (
    <>
      {isLoading && <Loader />}
      {!finished && isError ? (
        <NotFound />
      ) : (
        <BlogForm blog={blogData} setBlog={setBlog} handelSave={handelSave} />
      )}
    </>
  );
};
export default EditBlog;

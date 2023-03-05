import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";

function BlogForm({ blog, setBlog, handelSave }) {
  const navigate = useNavigate();

  const handelCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <form>
      <div className='flex flex-col gap-3'>
        <input
          type='text'
          className='input'
          placeholder='title'
          id='title'
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <textarea
          id='description'
          cols='30'
          rows='10'
          className='input'
          placeholder='description'
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          value={blog.description}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <Editor
          editorState={blog.content}
          onEditorStateChange={(content) =>
            setBlog({ ...blog, content: content })
          }
          editorStyle={{
            border: "1px solid #ccc",
            minHeight: "300px",
            padding: "10px",
          }}
          toolbarStyle={{
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div className='flex justify-end items-center my-3 gap-3'>
        <button className='btn bg-primary' onClick={handelSave}>
          Save
        </button>
        <button
          className='border shadow px-3 py-2 rounded'
          onClick={handelCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default BlogForm;

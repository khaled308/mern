import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

const Card = ({ data, className }) => {
  return (
    <div
      className={
        "bg-white rounded-lg shadow-md p-4 min-w-[200px] max-w-[500px] " +
        className
      }
    >
      <div className='border-b-2 mb-3 py-3'>
        <h2 className='text-xl font-bold mb-2'>{data.title}</h2>
        <p className='text-gray-600'>{data.description}</p>
      </div>

      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex flex-col'>
          <h2>Posted on: {moment(data.createdAt).format("DD-MM-YYYY")}</h2>
          <h2>Posted By: {data.user.name}</h2>
        </div>

        <div className='flex gap-3'>
          <div className='flex gap-2 items-center'>
            <AiFillHeart />
            {data.likesCount}
          </div>

          <div className='flex gap-2 items-center'>
            <BsFillChatFill />
            {data.commentsCount}
          </div>

          <div className='flex gap-2 items-center'>
            <FaShareSquare />
            {data.sharesCount}
          </div>
        </div>
      </div>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Edit
      </button>
    </div>
  );
};
export default Card;

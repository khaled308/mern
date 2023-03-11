import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

const Card = ({ data, className, ...utils }) => {
  return (
    <div
      className={
        "bg-white rounded-lg shadow-md p-4 min-w-[200px] max-w-[500px] " +
        className
      }
      {...utils}
    >
      <div className='border-b-2 mb-3 py-3'>
        <h2 className='text-xl font-bold mb-2'>{data.title}</h2>
        <p className='text-gray-600'>{data.description}</p>
      </div>

      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex flex-col'>
          <h2>Posted on: {moment(data.createdAt).format("DD-MM-YYYY")}</h2>
          <h2>Posted By: {data.author.name}</h2>
        </div>

        <div className='flex gap-3'>
          <div className='flex gap-2 items-center'>
            <AiFillHeart />
            {data.likes?.length || 0}
          </div>

          <div className='flex gap-2 items-center'>
            <BsFillChatFill />
            {data.comments?.length || 0}
          </div>

          <div className='flex gap-2 items-center'>
            <FaShareSquare />
            {data.shares?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ posts }) => {
  const [currentPost, setCurrentPost] = useState(null);

  const navigate = useNavigate();

  console.log(currentPost);

  return (
    <>
      {posts.map((post) => (
        <ul
          key={post.id}
          onClick={() => setCurrentPost(post.id)}
          className="p-2 my-2 bg-slate-100 h-[200px] min-w-[1000px] flex flex-col justify-center items-center cursor-pointer duration-100 border-teal-500 hover:border"
        >
          <li className="font-bold text-xl text-gray-500">{post.title}</li>
          <li className="max-w-[800px]">{post.body}</li>
          {currentPost === post.id && (
            <div className="p-2 my-2 flex items-center">
              <button className="p-2 h-[40px] w-[100px] rounded bg-red-500 text-white mx-2">
                delete
              </button>
              <button
                className="p-2 h-[40px] w-[100px] rounded bg-teal-500 text-white mx-2"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                details
              </button>
              <span
                className="p-2 h-[40px] w-[100px] bg-white text-center text-2xl font-bold z-10"
                onClick={() => setCurrentPost(null)}
              >
                X
              </span>
            </div>
          )}
        </ul>
      ))}
    </>
  );
};

export default Post;

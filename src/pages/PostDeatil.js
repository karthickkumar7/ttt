import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPost } from "../App/features/postSlice";

const PostDeatil = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, error, post } = useSelector(
    (s) => s.posts
  );

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-slate-200 ">
      {isLoading && (
        <h1 className="text-4xl font-bold text-center">Loading..</h1>
      )}
      {post?.id && (
        <div className="p-2 my-2 bg-slate-100 h-[200px] min-w-[1500px] flex flex-col justify-center items-center">
          <span
            className="cursor-pointer flex self-start text-2xl hover:scale-105"
            onClick={() => navigate("/posts")}
          >
            {"<=="}
          </span>
          <h1 className="font-bold text-xl text-gray-700 my-2">
            {post.id} {post.title}
          </h1>
          <p className="max-w-[800px] text-center">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostDeatil;

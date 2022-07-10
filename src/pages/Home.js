import { useDispatch, useSelector } from "react-redux";

import { getPosts, resetState } from "../App/features/postSlice";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, posts } = useSelector((s) => s.posts);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="m-2 p-1">
          {!isSuccess && (
            <button
              className="p-2 bg-teal-500 text-white mx-2 rounded"
              onClick={() => dispatch(getPosts())}
            >
              get posts
            </button>
          )}
          {isSuccess && (
            <button
              className="p-2 bg-red-500 text-white rounded"
              onClick={() => dispatch(resetState())}
            >
              reset
            </button>
          )}
        </div>
        {!posts.length && !isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-4xl font-bold">No posts to show</h1>
          </div>
        )}
        {isLoading ? (
          <h1 className="text-4xl font-bold">Loading..</h1>
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Home;

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-screen h-[60px] bg-teal-800 text-white flex justify-around items-center sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold animate-pulse">L(.)(.)K</h1>
      </div>
      <div>
        <ul className="flex">
          <li
            className={`${
              pathname === "/posts" && "text-blue-200 underline"
            } font-semibold text-xl cursor-pointer mx-4`}
          >
            <Link to="/posts">posts</Link>
          </li>
          <li
            className={`${
              pathname === "/nothing" && "text-blue-200 underline"
            } font-semibold text-xl cursor-pointer mx-4`}
          >
            <Link to="/d3js">D3js</Link>
          </li>
          <li
            className={`${
              pathname === "/game" && "text-blue-200 underline"
            } font-semibold text-xl cursor-pointer mx-4`}
          >
            <Link to="/game">Game</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

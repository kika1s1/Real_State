import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios'
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../features/user/userSlice";
const Header = () => {
  // const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const handleProfile = () => {
    setProfile((prev) => !prev);
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await axios.get('/api/auth/signout');
      // const data = await res.json();
      console.log(data.data)
      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.data));
        return;
      }
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  
  return (
    <header className="bg-slate-200 shadow-md" >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Tamirat</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
        </ul>
        {currentUser ? (
          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
            onClick={()=>setProfile(false)}
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <IoMdNotifications size={20}  />
            </button>

            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={handleProfile}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                  />
                </button>
              </div>

              <div
                className={`absolute ${!profile && "hidden"} right-0 ${
                  currentUser ? "" : "hidden"
                }  z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={handleProfile}
                >
                  {currentUser.username}
                  <span className="block text-sm   text-gray-500 truncate dark:text-gray-400">
                    {currentUser.email}
                  </span>
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={handleProfile}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/signin"><span className="text-slate-700 hover:underline"> Sign in</span></Link>
        )}
      </div>
    </header>
  );
};
export default Header;

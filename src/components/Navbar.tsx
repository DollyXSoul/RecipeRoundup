import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { Login } from "./";
import { User } from "../types";
interface NavbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
}

const Navbar = ({ searchTerm, setSearchTerm, user }: NavbarProps) => {
  const navigate = useNavigate();
  const { removeUser } = useAuthStore();

  return (
    <div className="w-full  flex flex-wrap justify-center lg:justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <div className="flex justify-start items-center px-2 border-2 border-gray-100 bg-white  focus-within:border-2 focus-within:border-green-700 rounded-full w-full lg:w-1/2">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => navigate("/home/search")}
          className="p-3 md:text-md font-medium   w-11/12 rounded-l-full outline-none"
          placeholder="Search Recipes and accounts "
        />
        <button className="border-l-2 border-gray-300 pl-2 text-2xl text-gray-400">
          <IoMdSearch />
        </button>
      </div>

      <div className="mt-1">
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link to="/home/create-post">
              <button className="rounded px-2 md:px-4 text-xl font-semibold flex items-center gap-2 my-1 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-700  hover:bg-gradient-to-br text-white">
                <IoMdAdd className="text-2xl " />
                <span>Upload</span>
              </button>
            </Link>

            <div className="mt-0.5">
              <Link
                to={`user-profile/${user?._id}`}
                className="hidden md:block"
              >
                <img
                  src={user.image}
                  alt="user-pic"
                  className="w-14 h-12 rounded-lg "
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className=" border-2 p-2  cursor-pointer outline-none shadow-sm flex rounded-full items-center gap-2 justify-center m-1.5 lg:m-1 "
            >
              <AiOutlineLogout color="green" fontSize={21} />{" "}
              <span className="font-medium text-md">Logout</span>
            </button>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Navbar;

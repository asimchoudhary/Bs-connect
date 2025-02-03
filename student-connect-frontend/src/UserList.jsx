import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEmailContext } from "./EmailProvider";
const UserList = ({ users }) => {
  const { userEmail, setUserEmail } = useEmailContext();
  localStorage.setItem("userEmail", userEmail);
  return (
    <div className="flex flex-wrap justify-center">
      {users.map((user, index) => (
        <div
          key={index}
          className="bg-transparent border border-purple-200 rounded-lg p-4 m-2 w-1/3 shadow-2xl flex flex-col items-center relative bg-opacity-50 bg-black"
        >
          <Link to={`/student/${user._id}`} target="_blank">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="absolute top-0 right-0 m-2  bg-purple-200 rounded-full p-2 hover:bg-purple-300 "
            />
          </Link>
          <img
            src={user.image}
            alt={user.name}
            className="rounded-full h-30 w-40 object-cover mb-3 border-2 border-whtie"
          />
          <h2 className="text-2xl  text-white">{user.name}</h2>
          <p className="text-white text-1l mt-1">
            {user.city} , {user.state}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;

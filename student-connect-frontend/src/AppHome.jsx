import React, { useState, useEffect } from "react";
import Pair from "./Pair.jsx";

import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../src/img/bg2.svg";
import { useEmailContext } from "./EmailProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faUser,
  faArrowLeft,
  faEnvelope,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const AppHome = () => {
  const { userMongoId, userEmail, userId } = useEmailContext();
  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  useEffect(() => {
    console.log(userMongoId);
  }, [userMongoId]);

  const location = useLocation();
  const email = location.state.email;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <nav className="fixed top-0 w-full bg-transparent px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-white-600 mr-4"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <h1 className="text-2xl font-bold text-white">BS-Connect</h1>
          </div>
          <div className="flex items-center  ">
            <Link
              to="/eddy"
              target="_blank"
              className="flex items-center text-white hover:text-purple-600 font-semibold"
            >
              <FontAwesomeIcon icon={faRobot} className="mr-1" />
              Eddy
            </Link>
            <Link
              target="_blank"
              to="/messages"
              className="flex items-center text-white hover:text-orange-600 font-semibold"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-1 ml-5" />
              Messages
            </Link>
          </div>
        </div>
      </nav>
      <div></div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-white shadow transition duration-300 ease-in-out transform translate-x-0">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-600 ml-4 mt-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </button>

          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            Account
          </a>
        </div>
      )}
      <div className="bg-transparent">
        <Pair email={email} />
      </div>
    </div>
  );
};

export default AppHome;

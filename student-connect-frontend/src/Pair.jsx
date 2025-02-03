import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList.jsx";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Pair = ({ email }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isSubjectsLoading, setisSubjectsLoading] = useState(false); // [1
  const [subjects, setSubjects] = useState([]); // Replace with actual subjects
  const [isLoading, setIsLoading] = useState(false); // [1]
  async function getSubjects() {
    setisSubjectsLoading(true); // [2]
    const response = await fetch("http://localhost:5000/getSubjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    setisSubjectsLoading(false); // [3]
    setSubjects(data);
  }
  useEffect(() => {
    getSubjects();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    async function fetchData() {
      setIsLoading(true); // [2]
      const response = await fetch("http://localhost:5000/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: event.target.subject.value,
          email: email,
        }),
      });
      const data = await response.json();
      setIsLoading(false); // [3]
      setUsers(data);
    }
    fetchData();
  };

  return (
    <div className="flex flex-col h-full p-4 m-0 bg-transparent rounded-lg shadow-lg">
      {isSubjectsLoading && (
        <div className="text-orange-600 text-center text-2xl">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}
      <div className="flex flex-col items-center mt-4">
        <div className="mb-4 text-2xl font-extralight text-center text-white">
          📚 Find your study buddy now!
        </div>
        <form onSubmit={handleSearch} className="flex">
          <select
            name="subject"
            className="flex-grow rounded-lg border-gray-300 border p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <button
            type="Submit"
            className="rounded-lg bg-blue-500 text-white p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
      <div className="bg-transparent">
        {isLoading ? ( // [4]
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl text-white">Loading...</div>
            <div className="text-white">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          </div>
        ) : (
          <UserList users={users} email={email} />
        )}
      </div>
    </div>
  );
};

export default Pair;

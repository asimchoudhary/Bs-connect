import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ProfileSetUp = () => {
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const password = location.state.password;
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [state, setState] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      const reader2 = new FileReader();
      reader2.onloadend = async () => {
        const arrayBuffer = reader2.result;
        setProfilePic(arrayBuffer);
      };
      reader2.readAsArrayBuffer(file);
    } else {
      setPreview(null);
    }
  }

  const handleCourseChange = (e) => {
    const numCourses = e.target.value;
    setNumCourses(numCourses);
    const newCourses = Array.from({ length: numCourses }, () => "");
    setCourses(newCourses);
  };
  const coursesList = [
    "AI",
    "Advanced Algorithms",
    "Algo Thinking",
    "AppDev1",
    "AppDev2",
    "BBN",
    "BDM",
    "Business Analytics",
    "CT",
    "DBMS",
    "Deep Learning",
    "Design Thinking",
    "Fin Forensics",
    "Industry 4.0",
    "Intro to BigData",
    "Intro to Python",
    "Java",
    "LSM",
    "MLF",
    "MLP",
    "MLT",
    "Market Research",
    "Maths2",
    "PDSA",
    "PSM",
    "RL",
    "SPG",
    "SW Engg",
    "Sem1 CT",
    "Sem1 English1",
    "Sem1 Maths1",
    "Sem1 Statistics1",
    "Sem2 English2",
    "Sem2 Intro to Python",
    "Sem2 Maths2",
    "Sem2 Statistics2",
    "Speech Tech",
    "Statistical Computing",
    "Statistics2",
    "Sw Engg",
    "Sw Testing",
    "System Commands",
    "TDS",
  ];
  function isValidUrl(string) {
    if (string === "") {
      return true;
    }
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  }

  const handleSave = () => {
    if (!name) {
      alert("please enter your name");
      return;
    }
    if (!preview) {
      alert("please upload a profile picture");
      return;
    }
    if (!gender) {
      alert("please select the gender");
      return;
    }
    if (!state) {
      alert("please select the state");
      return;
    }
    if (!city) {
      alert("please enter your city");
      return;
    }
    if (!numCourses) {
      alert("please select the number of courses");
      return;
    }
    if (courses.includes("")) {
      alert("please select all the courses");
      return;
    }
    if (!bio) {
      alert("please write a brief bio");
      return;
    }
    if (
      !isValidUrl(instagram) ||
      !isValidUrl(twitter) ||
      !isValidUrl(linkedin) ||
      !isValidUrl(github)
    ) {
      alert("Please enter valid URLs for the social links.");
      return;
    }

    const formData = {
      password: password,
      email: email,
      image: preview,
      name: name,
      gender: gender,
      state: state,
      city: city,
      courses: courses,
      bio: bio,
    };

    if (instagram !== "") {
      formData.instagram = instagram;
    }

    if (twitter !== "") {
      formData.twitter = twitter;
    }

    if (linkedin !== "") {
      formData.linkedin = linkedin;
    }

    if (github !== "") {
      formData.github = github;
    }

    async function uploadUserData() {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/profileSetUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        setIsLoading(false);
        navigate("/app-intro", { state: { email: email } });
      } else {
        setIsLoading(false);
        alert("there is some problem from our backend");
        navigate("/");
      }
    }

    uploadUserData();
  };

  return (
    <div className="relative z-0 first-letter:min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 ">
      <div className="text-center">
        Please Complete Profile Setup to Successfully Register
      </div>
      {isLoading && (
        <div className=" sweet-loading fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center text-blue-700 text-2xl z-50 font-bold">
          <ClipLoader
            color={"#123abc"}
            loading={isLoading}
            css={override}
            size={100}
            thickness={5}
          />
        </div>
      )}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <img src="" alt="" />
                <h2 className="leading-relaxed">Profile Setup</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  {preview && (
                    <img
                      className="rounded-full w-32 h-32 object-cover"
                      src={preview}
                      alt="Profile preview"
                    />
                  )}
                  <label className="leading-loose">Profile Picture</label>
                  <input
                    type="file"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="leading-loose">
                    Name
                  </label>
                  <input
                    className="leading-loose px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="leading-loose">Gender</label>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">Select your state</option>
                    <option value="Jammu&Kashmir">Jammu&Kashmir</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">
                      Dadra and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="leading-loose">
                    Your City
                  </label>
                  <input
                    className="leading-loose px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    type="text"
                    id="city"
                    city="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <label className="leading-loose">
                      How many courses are you opting this term?
                    </label>
                    <select
                      onChange={handleCourseChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    >
                      <option value="">Select number of courses</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                {Array.from({ length: numCourses }, (_, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="leading-loose">{`Subject ${
                      index + 1
                    }`}</label>
                    <select
                      onChange={(e) => {
                        let newCourses = [...courses];
                        newCourses[index] = e.target.value;
                        setCourses(newCourses);
                      }}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    >
                      <option value="">Select a course</option>
                      {coursesList.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Write a brief bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={1000}
                  className="px-4 py-2 h-24 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                />
                <span>{bio.length}/1000</span>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">
                  Instagram Profile
                  <p className="mr-4 text-gray-500 inline">(optional)</p>
                </label>
                <div className="flex items-center">
                  <FaInstagram className="mr-2" />
                  <input
                    type="url"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="https://instagram.com/yourprofile"
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">
                  Twitter Profile
                  <p className="mr-4 text-gray-500 inline">(optional)</p>
                </label>

                <div className="flex items-center">
                  <FaTwitter className="mr-2" />
                  <input
                    type="url"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="https://twitter.com/yourprofile"
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">
                  LinkedIn Profile
                  <p className="mr-4 text-gray-500 inline">(optional)</p>
                </label>
                <div className="flex items-center">
                  <FaLinkedin className="mr-2" />
                  <input
                    type="url"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="https://linkedin.com/in/yourprofile"
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">
                  GitHub Profile
                  <p className="mr-4 text-gray-500 inline">(optional)</p>
                </label>
                <div className="flex items-center">
                  <FaGithub className="mr-2" />
                  <input
                    type="url"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="https://github.com/yourprofile"
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={handleSave}
                  className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetUp;

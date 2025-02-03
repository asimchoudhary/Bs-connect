// App.jsx
import React from "react";
import "./index.css";
import Home from "./Home";
import About from "./About";
import SignUp from "./SignUp";
import Verification from "./Verification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSetUp from "./profileSetup";
import Login from "./Login";
import AppIntro from "./AppIntro";
import AppHome from "./AppHome";
import Eddy from "./Eddy";
import Pair from "./Pair";
import UserProfile from "./UserProfile";
import Messages from "./Messages";
import { EmailProvider } from "./EmailProvider"; // Import AuthProvider

const App = () => {
  return (
    <EmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/verification" element={<Verification />} />
          <Route path="/profileSetup" element={<ProfileSetUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app-intro" element={<AppIntro />} />
          <Route path="/app-home" element={<AppHome />} />
          <Route path="/eddy" element={<Eddy />} />
          <Route path="/pair" element={<Pair />} />
          <Route path="/student/:userId" element={<UserProfile />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </EmailProvider>
  );
};

export default App;

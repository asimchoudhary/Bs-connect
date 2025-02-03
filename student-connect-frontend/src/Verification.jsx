import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const VerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const email = location.state.email;
  const password = location.state.password;
  const handleInputChange = (index, value) => {
    // Ensure input is a number and update the corresponding OTP digit
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next empty box if present
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        document.getElementById(`otp-input-${nextEmptyIndex}`).focus();
      }
    }
  };

  const handleVerify = async function () {
    // Add your verification logic here
    const enteredOtp = otp.join("");

    // Add logic for verifying the OTP
    async function verifyOtp() {
      const otpObj = {
        otp: enteredOtp,
        userEmail: email,
        name: location.state.name,
        password: location.state.password,
      };
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/otp_verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpObj),
      });
      if (response.status === 200) {
        setIsLoading(false);
        navigate("/profileSetUp", {
          state: { email: email, password: password },
        });
        return "ok";
      } else {
        setIsLoading(false);
        alert("Incorrect OTP");
        navigate("/");
        return "error";
      }
    }
    try {
      const result = await verifyOtp();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const isVerifyButtonDisabled = otp.some((digit) => digit === ""); // Disable button if any box is empty

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
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
      <h1 className="text-3xl font-bold mb-4">Verify your Email</h1>
      <p className="text-gray-600 mb-8">
        Enter the OTP sent to your registered email.
      </p>

      <div className="flex items-center space-x-4 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded-md text-center text-2xl focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifyButtonDisabled}
        className={`py-2 px-4 rounded-md text-white ${
          isVerifyButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Verify
      </button>
    </div>
  );
};

export default VerificationPage;

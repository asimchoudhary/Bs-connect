import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.study\.iitm\.ac\.in$/;
    if (!value.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    //validateEmail(formData.email);
    const emailError = "";
    const passwordError = validatePassword(formData.password);

    // Set the errors state based on validation results
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // If any validation errors, stop the form submission
    if (emailError || passwordError) {
      return;
    }

    // If validation passes, proceed with form submission logic

    async function submitForm() {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 400) {
        setIsLoading(false);
        alert("Email already registered");

        return;
      } else {
        setIsLoading(false);
        navigate("/signup/verification", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
      }
    }
    submitForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Student Email address "
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500" id="password-error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppIntro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  function handleClick() {
    navigate("/app-home", { state: { email: email } });
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img src="img\CompanyLogo.svg" className="h-24 sm:h-32" />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <h2 className="font-bold text-2xl mb-2">
                      Hello <span className="text-cyan-600">User</span>! Welcome
                      to our BS-Connect! 🎉
                    </h2>
                    <p>
                      We're thrilled to have you here on board. Let me give you
                      a warm introduction to some of the fantastic features that
                      await you:
                    </p>
                    <h3 className="font-bold text-xl mb-1">
                      Personal Study Companion (BETA):
                    </h3>
                    <p>
                      We've got a dedicated Language Learning Model (LLM) based
                      on the Falcon model to make your study sessions a breeze.
                      Imagine having an intelligent study buddy at your
                      fingertips! You can ask the LLM any questions that pop up
                      while watching your lectures online.
                    </p>
                    <h3 className="font-bold text-xl mb-1">
                      Find the Students in the Same course
                    </h3>
                    <p>
                      Learning is more enjoyable when it's a shared experience,
                      right? Well, we've got you covered! Join a virtual
                      classroom with your classmates, where you can study
                      together, watch videos, and collaborate on assignments.
                      It's like bringing the classroom to your screen, making
                      learning both social and fun.
                    </p>
                    <p>
                      Feel free to explore these features and make the most out
                      of your learning journey with us. If you have any
                      questions or need assistance along the way, don't hesitate
                      to reach out. Happy studying,{" "}
                      <span className="text-cyan-600">User</span>! 🚀
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Start your Awesome Journey</p>
                <p>
                  <button
                    onClick={handleClick}
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    {" "}
                    Get started here &rarr;{" "}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntro;

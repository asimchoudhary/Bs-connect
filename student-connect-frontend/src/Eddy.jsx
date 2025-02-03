import React from "react";

import eddy2 from "./img/eddy2.jpg";

const Eddy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src={eddy2}
        alt="uploadedImage"
        className="w-72 h-89 object-cover rounded-full shadow-lg mb-8"
      />
      <div class="container mx-auto mt-8 p-4">
        <div class="bg-white rounded-lg p-8 shadow-md">
          <h1 class="text-3xl font-bold mb-4">
            Introducing Our Revolutionary Study Companion Chatbot!
          </h1>
          <p class="text-gray-600 mb-4">
            Powered by the open-source Falcon model, this innovative tool is
            your 24/7 virtual study buddy. It's not just an assistant; it's a
            game-changer in the way you approach your studies.
          </p>
          <p class="text-gray-600 mb-4">
            Imagine having a chatbot that can assist with questions, provide
            layman explanations, and offer personalized study tips at your
            fingertips.
          </p>
          <p class="text-gray-600 mb-4">
            Exciting news! Our chatbot is currently in development and will be
            released soon. Be among the first to experience its benefits by
            joining our waitlist. Don't miss out on the opportunity to
            supercharge your learning journey!
          </p>
          <p class="text-gray-600">
            Stay tuned for updates, and get ready to take your studies to the
            next level!
          </p>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Join the Waitlist
      </button>
    </div>
  );
};

export default Eddy;

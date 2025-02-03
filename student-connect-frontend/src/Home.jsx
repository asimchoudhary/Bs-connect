import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white text-3xl font-bold">BS-Connect</div>
        <div className="flex space-x-4">
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <div class="bg-gray-100">
        <div class="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-2xl">
          <h1 class="text-4xl font-bold mb-4">Welcome to BS-Connect</h1>

          <p class="text-lg text-gray-700 mb-8">
            Connecting Students, Enhancing Learning
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-blue-100 rounded-lg">
              <h2 class="text-2xl font-bold mb-4">Why Choose BS-Connect?</h2>
              <ul class="list-disc ml-6">
                <li class="mb-2">
                  Study Partnerships: Connect with students taking the same
                  courses.
                </li>
                <li class="mb-2">
                  Resource Sharing: Share study materials and valuable insights.
                </li>
                <li class="mb-2">
                  Community Support: Join Link community of like-minded
                  students.
                </li>
              </ul>
            </div>

            <div class="p-6 bg-green-100 rounded-lg">
              <h2 class="text-2xl font-bold mb-4">What Sets Us Apart?</h2>
              <p class="text-gray-700 mb-4">
                At BS-Connect, we believe in fostering Link community where
                every student can thrive academically.
              </p>
              <div class="border-t-2 border-gray-300 pt-4"></div>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">How It Works</h2>
            <ol class="list-decimal ml-6">
              <li class="mb-2">
                Sign Up: Create your Connect account for free.
              </li>

              <li class="mb-2">
                Connect with Peers: Discover students taking the same courses
                and start building study connections.
              </li>
            </ol>
          </div>

          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Ready to Collaborate?</h2>
            <p class="text-gray-700 mb-4">
              Join BS-Connect today and take your learning to new heights.
            </p>
            <Link
              to="/signup"
              class="bg-blue-500 text-white py-2 px-4 rounded-md inline-block font-semibold hover:bg-blue-800 hover:text-white transition duration-300"
            >
              Join BS-Connect
            </Link>
          </div>

          <div class="mt-8">
            <p class="text-gray-700 mb-2">
              Still have questions?{" "}
              <Link to="#" class="text-blue-500">
                Contact Me
              </Link>{" "}
              for assistance.
            </p>
          </div>

          <div class="mt-8">
            <p class="text-gray-700">Let's Connect and Excel Together!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

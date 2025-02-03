const About = () => {
  return (
    <div>
      <body className="bg-gray-100">
        <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>

          <div className="flex items-center mb-8">
            <div className="rounded-full overflow-hidden mr-4"></div>
            <div>
              <h2 className="text-2xl font-bold">Hello, I'm Asim</h2>
              <p className="text-gray-700">Founder & CEO, Student Connect</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            Welcome to Student Connect, where the vision of transforming the
            student learning experience comes to life. As the Founder and CEO,
            I'm thrilled to share our journey with you.
          </p>

          <p className="text-lg text-gray-700 mb-8">
            Student Connect was born out of a belief that collaborative learning
            can redefine how students approach education. Through my own
            experiences and challenges as a student, the idea of creating a
            platform that fosters connection and community emerged.
          </p>

          <p className="text-lg text-gray-700 mb-8">
            At Student Connect, we are not just building a platform; we are
            creating a community where students can thrive academically, connect
            with peers, and support each other's growth.
          </p>

          <p className="text-lg text-gray-700">
            Join us on this journey of collaborative learning, where each
            student's success contributes to the collective success of the
            community. Thank you for being a part of Student Connect.
          </p>
        </div>
      </body>
    </div>
  );
};
export default About;

import React from "react";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Congratulations!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        You have successfully completed the test.
      </p>
      <button
        className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Success;

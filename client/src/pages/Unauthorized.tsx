import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
      <p className="mb-4">You do not have access to the requested page.</p>
      <div>
        <button
          onClick={goBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;

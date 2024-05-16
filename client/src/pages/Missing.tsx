import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className="text-center p-4 min-h-[83vh]">
      <h1 className="mt-4 mb-2 text-2xl font-bold">Oops!</h1>
      <p className="mb-4 text-lg">Page Not Found</p>
      <div>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Visit our Homepage
        </Link>
      </div>
    </article>
  );
};

export default Missing;

import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className="text-center p-4">
      <h1 className="text-2xl font-bold mb-2">Oops!</h1>
      <p className="text-lg mb-4">Page Not Found</p>
      <div>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Visit our Homepage
        </Link>
      </div>
    </article>
  );
};

export default Missing;

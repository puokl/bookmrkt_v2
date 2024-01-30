import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen space-x-2 bg-emerald-100">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-emerald-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-emerald-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-8 h-8 rounded-full bg-emerald-800 animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;

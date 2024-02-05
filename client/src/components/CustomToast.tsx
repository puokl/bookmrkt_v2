import React, { useState, useEffect } from "react";

interface CustomToastProps {
  message: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between p-4 text-white bg-blue-900 rounded-md shadow-md">
        <div className="mr-4">
          <p>{message}</p>
        </div>
        <div className="cursor-pointer" onClick={onClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default CustomToast;

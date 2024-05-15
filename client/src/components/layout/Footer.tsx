import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center bg-slate-200">
      <p>
        &copy; {currentYear} Bookmarkt &nbsp; | &nbsp;
        <a href="https://www.puok.de/" className="font-bold text-blue-900">
          Puokl
        </a>
      </p>
    </footer>
  );
};

export default Footer;

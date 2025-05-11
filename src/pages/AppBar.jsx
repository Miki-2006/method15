import React from "react";

const AppBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-lg backdrop-saturate-150 shadow-md px-6 py-2">
      <ul className="flex justify-around items-center text-slate-700">
        <li>
          <a href="/" className="flex flex-col items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l9-9 9 9M4 10v10h6v-6h4v6h6V10"
              />
            </svg>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/profile" className="flex flex-col items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.535 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Profile</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AppBar;

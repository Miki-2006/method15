import React from "react";

const PasswordInput = ({ password, setPassword, isPasswordNotCorrect }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="password"
        required
      ></input>
      {isPasswordNotCorrect ? <b className="text-sm font-medium text-red-700 dark:text-red-300">Password not correct!</b> : ""}
    </div>
  );
};

export default PasswordInput;

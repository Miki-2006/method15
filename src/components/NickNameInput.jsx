import React from "react";

const NickNameInput = ({nickName, setNickName}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="text"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Nick name
      </label>
      <input
        type="text"
        id="nickName"
        onChange={(e) => setNickName(e.target.value)}
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="your nick name"
        required
      ></input>
    </div>
  );
};

export default NickNameInput;

import React from "react";

const CheckBox = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
          defaultChecked={true}
        ></input>
        <label
          htmlFor="remember"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
    </div>
  );
};

export default CheckBox;

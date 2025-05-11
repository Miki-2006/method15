import React from "react";

const WordTranslateForm = ({fetchDefinition, word, setWord}) => {
  return (
    <form
      onSubmit={(e) => fetchDefinition(e)}
      className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-6 py-4 max-w-md w-full"
    >
      <h1 className="text-xl font-bold text-center mb-4 dark:text-white">
        Find a Definition
      </h1>
      <input
        type="text"
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default WordTranslateForm;

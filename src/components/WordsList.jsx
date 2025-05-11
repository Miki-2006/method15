import React from "react";

const WordsList = ({definition, startsWith, soundsLike, synonyms}) => {
  return (
    <>
      {definition && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md w-full">
          <p className="text-gray-800 dark:text-white">
            <span className="font-bold">definition:</span> {definition}
          </p>
        </div>
      )}

      {synonyms && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md w-full">
          <b className="text-xl font-bold text-center mb-4 dark:text-white">
            Synonyms:
          </b>
          <p className="flex flex-col text-gray-800 dark:text-white">
            {synonyms.map((el, indx) => (
              <span className="font-bold" key={indx}>
                {el?.word}
              </span>
            ))}
          </p>
        </div>
      )}

      {soundsLike && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md w-full">
          <b className="text-xl font-bold text-center mb-4 dark:text-white">
            Similar sounds::
          </b>
          <p className="flex flex-col text-gray-800 dark:text-white">
            {soundsLike.map((el, indx) => (
              <span className="font-bold" key={indx}>
                {el?.word}
              </span>
            ))}
          </p>
        </div>
      )}

      {startsWith && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md w-full">
          <b className="text-xl font-bold text-center mb-4 dark:text-white">
            Similar start:
          </b>
          <p className="flex flex-col text-gray-800 dark:text-white">
            {startsWith.map((el, indx) => (
              <span className="font-bold" key={indx}>
                {el?.word}
              </span>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default WordsList;

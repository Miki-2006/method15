import { useState, useEffect } from "react";

const WordsList = ({ definition, onDefinitionChange }) => {
  const [editing, setEditing] = useState(false);
  const [localDefinition, setLocalDefinition] = useState(definition ?? "");

  useEffect(() => {
    if (!editing) {
      setLocalDefinition(definition ?? "");
    }
  }, [definition, editing]);


  const handleSave = () => {
    setEditing(false);
    onDefinitionChange(localDefinition); // передаём вверх
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
      {definition && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md w-full">
          {!editing ? (
            <p
              className="text-gray-800 dark:text-white cursor-pointer whitespace-pre-line"
              onClick={() => setEditing(true)}
              title="Click to edit"
            >
              <span className="font-bold">Definition:</span> {definition}
            </p>
          ) : (
            <textarea
              value={localDefinition ?? ""}
              onChange={(e) => setLocalDefinition(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
              rows={4}
            />
          )}
        </div>
      )}
    </>
  );
};

export default WordsList;

import { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import styles from "./wordlist.module.css";

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
        <div className={styles.container}>
          {!editing ? (
            <p
              className={styles.text}
              onClick={() => setEditing(true)}
              title="Click to edit"
            >
              <span className={styles.bold}>Definition:</span> {definition}
              <FaPencil className={styles.pencilIcon} />
            </p>
          ) : (
            <textarea
              value={localDefinition ?? ""}
              onChange={(e) => setLocalDefinition(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              rows={4}
              className={styles.textarea}
            />
          )}
        </div>
      )}
    </>
  );
};

export default WordsList;

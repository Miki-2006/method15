import { useState, useEffect } from "react";
import { fetchWords } from "../../services/fetchWords";
import styles from "./savedwords.module.css";
import supabase from "../../services/supabase";
import { CiSquarePlus } from "react-icons/ci";

const SavedWords = ({ user }) => {
  const [words, setWords] = useState(null);
  const [modulesOfUser, setModulesOfUser] = useState(null);
  const [newModule, setNewModule] = useState("B2");

  useEffect(() => {
    const fetchModulesOfUser = async () => {
      try {
        const { data: modules, error } = await supabase
          .from("modules")
          .select("*")
          .eq("user_id", user.id);
        if (modules) {
          setModulesOfUser(modules);
        }
        if (error) {
          console.error(error);
        }
      } catch (err) {
        console.error("Error fetch modules:", err);
      }
    };
    fetchModulesOfUser();
  }, [user]);

  const createModule = async () => {
    // try {
    //   const {data, error} = await supabase.from("modules").insert({name: newModule, user_id: user.id})
    //   if (data) {
    //     console.log(data);
        
    //   }
    //   if (error) {
    //     console.error(error);
    //   }
    // } catch (err) {
    //   console.error("Error in creating module:", err);
    // }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wordsWrapper}>
        <div className={styles.modules}>
          <b className={styles.modulesTitle}>my modules:</b>
          <CiSquarePlus className={styles.plus} onClick={createModule} />
        </div>
        {modulesOfUser === null ? (
          <b className={styles.noModules}>No modules!</b>
        ) : (
          <ul className={styles.modulesList}>
            {modulesOfUser.map((el, indx) => (
              <li className={styles.module} key={indx}>
                {el}
              </li>
            ))}
          </ul>
        )}
        {words &&
          words.map((word) => (
            <div key={word.id} className={styles.wordCard}>
              <h2 className={styles.wordTitle}>{word.word}</h2>
              <p className={styles.wordDefinition}>{word.definition}</p>
            </div>
          ))}
      </div>
      {words && (
        <a href="/test" className={styles.learnButton}>
          Learn
        </a>
      )}
    </div>
  );
};

export default SavedWords;

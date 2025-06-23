import { useState, useEffect } from "react";
import WordTranslateForm from "../../components/Forms/WordTranslateFrom/WordTranslateForm";
import LoadingOverlay from "../../components/Loaders/LoadingOverlay";
import { getDefinitionFromDictionaryApi } from "../../services/dictionary";
import WordsList from "../../components/WordList/WordsList";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import Unsplash from "../../components/Unsplash/Unsplash";
import styles from "./definition.module.css";

const Definition = () => {
  const [word, setWord] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [modulesOfUser, setModulesOfUser] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedModuleError, setSelectedModuleError] = useState(false);
  const navigate = useNavigate();

  const fetchDefinition = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getDefinitionFromDictionaryApi(word, setDefinition, setError);
    if (!error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (definition) {
      setLoading(false);
    }
  }, [definition]);

  useEffect(() => {
    const fetchModulesOfUser = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      // if (!userId) {
      //   navigate("/sign-in");
      //   return;
      // }
      try {
        const { data: modules } = await supabase
          .from("modules")
          .select("*")
          .eq("user_id", userId);
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
  }, [error, navigate]);

  const handleSave = async () => {
    setLoading(true);

    if (!localStorage.getItem("user")) {
      navigate("/sign-in");
      return;
    } else if (!selectedModule) {
      setSelectedModuleError(true);
    }
    try {
      // const { data, error } = await supabase.from("words").insert();
      // if (data) {
      //   const res = [data];
      // }
      // if (error) {
      //   console.error(error);
      // }
      // setModulesOfUser(res.modules);
      console.log(image);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
      setLoading(false);
    } catch (err) {
      console.error("Error saving word:", err);
      setLoading(false);
    }
  };

  const handleDefinitionChange = (newDefinition) => {
    setDefinition(newDefinition);
  };

  return (
    <div className={styles.container}>
      <LoadingOverlay success={success} loading={loading} />
      <h2 className={styles.title}>Find a Definition</h2>
      <WordTranslateForm
        fetchDefinition={fetchDefinition}
        word={word}
        setWord={setWord}
      />

      {error && <b className={styles.errorText}>We couldn't find the word!</b>}

      <div className={styles.info}>
        <WordsList
          definition={definition}
          onDefinitionChange={handleDefinitionChange}
        />

        {definition && (
          <Unsplash query={word} onSelect={(url) => setImage(url)} />
        )}

        {definition && modulesOfUser && (
          <div className={styles.modules}>
            <b className={styles.modulesTitle}>my modules:</b>
            <ul className={styles.modulesList}>
              {Object.entries(modulesOfUser).map(([key, el], indx) => (
                <li
                  className={`${styles.module} ${
                    selectedModule === key ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedModule(key)}
                  key={indx}
                >
                  {el}
                </li>
              ))}
            </ul>
            {selectedModuleError && (
              <b className={styles.errorText}>Please, select module!</b>
            )}
          </div>
        )}

        {definition && (
          <button onClick={handleSave} className={styles.learnButton}>
            Learn
          </button>
        )}
      </div>
    </div>
  );
};

export default Definition;

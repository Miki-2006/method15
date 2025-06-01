import { useEffect, useState } from "react";
import WordTranslateForm from "../components/WordTranslateForm";
import LoadingOverlay from "../components/LoadingOverlay";
import { getDefinitionFromDictionaryApi } from "../services/dictionary";
import WordsList from "../components/WordsList";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Unsplash from "../components/Unsplash/Unsplash";

const Main = () => {
  const [word, setWord] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const fetchDefinition = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getDefinitionFromDictionaryApi(word, setDefinition, setError);
    if (!error) {
      setLoading(false)
    }
  };


  useEffect(() => {
    if (definition) {
      setLoading(false);
    }
  }, [definition]);

  const handleSave = async () => {
    setLoading(true);
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const formData = new FormData();
    formData.append("word", word);
    formData.append("definition", definition);
    formData.append("imageURL", image);

    const wordData = Object.fromEntries(formData.entries());

    if (!userId) {
      navigate("/sign-in");
      return;
    }
    try {
      const userRef = doc(db, "users", userId);
      const wordsCollectionRef = collection(userRef, "words");

      await addDoc(wordsCollectionRef, wordData);
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
    // можешь также здесь вызывать сохранение в базу / localStorage и т.д.
  };

  return (
    <>
      <LoadingOverlay loading={loading} success={success} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 mb-20">
        <WordTranslateForm
          fetchDefinition={fetchDefinition}
          word={word}
          setWord={setWord}
        />

        {error ? <b className="text-sm font-medium text-red-700 dark:text-red-300">We couldn't fine word!</b> : ''}

        <WordsList
          definition={definition}
          onDefinitionChange={handleDefinitionChange}
        />

        {definition ? (
          <Unsplash query={word} onSelect={(url) => setImage(url)} />
        ) : (
          ""
        )}

        {definition && (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
          >
            Learn
          </button>
        )}
      </div>
    </>
  );
};

export default Main;

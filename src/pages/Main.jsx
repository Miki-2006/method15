import { useEffect, useState } from "react";
import WordTranslateForm from "../components/WordTranslateForm";
import LoadingOverlay from "../components/LoadingOverlay";
import { getDefinitionFromDictionaryApi } from "../services/dictionary";
import {
  getSoundsLikeFromDatamuse,
  getStartWithFromDatamuse,
  getSynonymsFromDatamuse,
} from "../services/datamuse";
import WordsList from "../components/WordsList";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [word, setWord] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [synonyms, setSynonyms] = useState(null);
  const [soundsLike, setSoundsLike] = useState(null);
  const [startsWith, setStartsWith] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchDefinition = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getDefinitionFromDictionaryApi(word, setDefinition);
    await getSynonymsFromDatamuse(word, setSynonyms);
    await getSoundsLikeFromDatamuse(word, setSoundsLike);
    await getStartWithFromDatamuse(word, setStartsWith);
  };

  useEffect(() => {
    if (synonyms && soundsLike && startsWith) {
      setLoading(false);
    }
  }, [soundsLike, synonyms, startsWith]);

  const handleSave = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const formData = new FormData();
    formData.append("word", word);
    formData.append("definition", definition);
    formData.append(
      "synonyms",
      synonyms.map((item) => item.word)
    );
    formData.append(
      "startWith",
      startsWith.map((item) => item.word)
    );
    formData.append(
      "soundsLike",
      soundsLike.map((item) => item.word)
    );

    const wordData = Object.fromEntries(formData.entries());

    if (!userId) {
      navigate("/sign-in");
      return;
    }
    try {
      const userRef = doc(db, "users", userId);
      const wordsCollectionRef = collection(userRef, "words");


      await addDoc(wordsCollectionRef, wordData);
      console.log(wordData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      console.error("Error saving word:", err);
    }
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

        {definition && (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
          >
            Learn
          </button>
        )}

        <WordsList
          synonyms={synonyms}
          soundsLike={soundsLike}
          startsWith={startsWith}
          definition={definition}
        />
      </div>
    </>
  );
};

export default Main;

import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { getConfusingWords } from "../../services/datamuse";
import TestCard from "../../components/TestCard/TestCard";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [user, setUser] = useState(null);
  const [words, setWords] = useState(null);
  const [confusingWords, setConfusingWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Ошибка парсинга user из localStorage", err);
      }
    } else {
      console.warn("Пользователь не найден в localStorage");
    }
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      // Найти документ пользователя по displayName
      const usersQuery = query(
        collection(db, "users"),
        where("nickName", "==", user?.nickName)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const userDoc = usersSnapshot.docs[0];

      if (!userDoc) return;

      const wordsRef = collection(userDoc.ref, "words");
      const snapshot = await getDocs(wordsRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWords(data);
    };

    if (user) {
      fetchWords();
    }
  }, [user]);

  useEffect(() => {
    const prepareOptions = async () => {
      if (words?.length === 0) return;
      const wordData = words?.[selectedWord];
      const confusing = await getConfusingWords(wordData?.word);
      const choices = [wordData?.word, ...confusing.map((w) => w.word)].slice(
        0,
        4
      );
      const shuffled = choices
        .map((w) => ({ word: w, id: Math.random().toString(36) }))
        .sort(() => 0.5 - Math.random());
      setConfusingWords(shuffled);
    };
    prepareOptions();
  }, [selectedWord, words]);

  const handleSelect = (selected) => {
    if (showAnswer) return;
    setSelectedAnswer(selected);
    setShowAnswer(true);
    const correct = words[selectedWord].word;
    if (selected === correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
    setTimeout(() => {
      if (selectedWord + 1 < words.length) {
        setSelectedWord((prev) => prev + 1);
      } else {
        setFinished(true);
      }
      setSelectedAnswer(null);
      setShowAnswer(false);
    }, 1500);
  };

  const handleRestart = () => {
    setSelectedWord(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setFinished(false);
  };

  const handleGoProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950 mb-20">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        {finished ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Results
            </h2>
            <p className="dark:text-white">
              Corrects: {correctCount}
            </p>
            <p className="dark:text-white">
              Incorects: {incorrectCount}
            </p>
            <div className="flex justify-between gap-4 mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleRestart}
              >
                Again
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={handleGoProfile}
              >
                Exit
              </button>
            </div>
          </div>
        ) : (
          words?.length > 0 &&
          confusingWords?.length > 0 && (
            <TestCard
              wordData={words[selectedWord]}
              confusingWords={confusingWords}
              onSelect={handleSelect}
              selectedAnswer={selectedAnswer}
              showAnswer={showAnswer}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Test;

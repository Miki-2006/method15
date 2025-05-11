import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const SavedWords = ({ userNickName }) => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      // Найти документ пользователя по displayName
      const usersQuery = query(
        collection(db, "users"),
        where("nickName", "==", userNickName)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const userDoc = usersSnapshot.docs[0];

      if (!userDoc) return;

      const wordsRef = collection(userDoc.ref, "words");
      const snapshot = await getDocs(wordsRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWords(data);
    };

    fetchWords();
  }, [userNickName]);

  return (
    <div className="space-y-4">
      {words?.map((word) => (
        <div
          key={word.id}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <h2 className="text-lg font-semibold dark:text-white">{word.word}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {word.definition}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SavedWords;

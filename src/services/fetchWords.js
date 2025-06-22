import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const fetchWords = async (user) => {
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
  return data
};

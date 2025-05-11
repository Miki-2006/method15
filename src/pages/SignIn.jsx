import { useState } from "react";
import NickNameInput from "../components/NickNameInput";
import PasswordInput from "../components/PasswordInput";
import CheckBox from "../components/CheckBox";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import LoadingOverlay from "../components/LoadingOverlay";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordNotCorrect, setIsPasswordNotCorrect] = useState(false)
  const navigate = useNavigate()

  const checkUserFromDB = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userRef = collection(db, "users");
    const q = query(userRef, where("nickName", "==", nickName));
    const res = await getDocs(q);

    if (res.empty) {
      console.log("Пользователь не найден");
      setIsLoading(false)
      return null;
    }
    const userData = res.docs[0].data();
    if (userData.password === password) {
      localStorage.setItem("user", JSON.stringify({...userData, id: res.docs[0].id}))
      
      
      setIsLoading(false);
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/profile')
      }, 2000);
    } else {
      setIsLoading(false)
      setIsPasswordNotCorrect(true)
    }
  };

  return (
    <>
      <LoadingOverlay loading={isLoading} success={isSuccess} />
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome!
          </h1>
          <form onSubmit={(e) => checkUserFromDB(e)}>
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            <PasswordInput password={password} setPassword={setPassword} isPasswordNotCorrect={isPasswordNotCorrect} />
            <CheckBox />
            <a
              href="/sign-up"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </a>
            <button
              type="submit"
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

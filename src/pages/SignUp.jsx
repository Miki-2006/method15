import { useState } from "react";
import CheckBox from "../components/CheckBox";
import NickNameInput from "../components/NickNameInput";
import PasswordInput from "../components/PasswordInput";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

const SignUp = () => {
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await addDoc(collection(db, "users"), {
        nickName: nickName,
        password: password,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: newUser.id,
          nickName: nickName,
          password: password,
        })
      );
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/profile");
      }, 2000);
    } catch (e) {
      console.error("Ошибка при записи документа:", e);
    }
  };

  return (
    <>
      <LoadingOverlay loading={isLoading} success={isSuccess} />
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Registration!
          </h1>
          <form onSubmit={(e) => addUser(e)}>
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            <PasswordInput password={password} setPassword={setPassword} />
            <CheckBox />
            <a
              href="/sign-in"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Already have account
            </a>
            <button
              type="submit"
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

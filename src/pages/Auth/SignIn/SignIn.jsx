import { useState } from "react";
import NickNameInput from "../../../components/Auth/NickName/NickNameInput";
import PasswordInput from "../../../components/Auth/Password/PasswordInput";
import CheckBox from "../../../components/Auth/CheckBox/CheckBox";
import LoadingOverlay from "../../../components/Loaders/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";
import supabase from "../../../services/supabase";

const SignIn = () => {
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordNotCorrect, setIsPasswordNotCorrect] = useState(false);
  const navigate = useNavigate();

  const checkUserFromDB = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await supabase.from('users').select().eq('nickName', nickName);
    
    if (res.status !== 200) {
      console.log("Пользователь не найден");
      setIsLoading(false);
      return null;
    }
    const userData = res.data[0];
    
    if (userData.password === password) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userData})
      );

      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/profile");
      }, 2000);
    } else {
      setIsLoading(false);
      setIsPasswordNotCorrect(true);
    }
  };

  return (
    <>
      <LoadingOverlay loading={isLoading} success={isSuccess} />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome!</h1>
          <form onSubmit={(e) => checkUserFromDB(e)}>
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              isPasswordNotCorrect={isPasswordNotCorrect}
            />
            <CheckBox />
            {/* <GoogleButton /> */}
            <a href="/sign-up" className={styles.link}>
              Create Account
            </a>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

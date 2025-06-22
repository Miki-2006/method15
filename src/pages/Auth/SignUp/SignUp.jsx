import { useState } from "react";
import CheckBox from "../../../components/Auth/CheckBox/CheckBox";
import NickNameInput from "../../../components/Auth/NickName/NickNameInput";
import PasswordInput from "../../../components/Auth/Password/PasswordInput";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../components/Loaders/LoadingOverlay";
import supabase from "../../../services/supabase";
import EmailInput from "../../../components/Auth/Email/EmailInput";
import GoogleButton from "../../../components/Auth/Google/GoogleButton";
import styles from "./signup.module.css";

const SignUp = () => {
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: email,
          password: password,
          nickName: nickName,
        })
        .select();

      if (error) {
        setIsLoading(false);
        console.error(error);
        return;
      }

      if (data) {
        setIsLoading(false);
        setIsSuccess(true);
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/profile");
        }, 2000);
      }
    } catch (e) {
      console.error("Ошибка при регистрации:", e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={isLoading} success={isSuccess} />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Registration!</h1>
          <form onSubmit={(e) => addUser(e)}>
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput
              passwordError={passwordError}
              password={password}
              setPassword={setPassword}
            />
            <CheckBox />
            {/* <GoogleButton /> */}
            <a href="/sign-in" className={styles.link}>
              Already have account
            </a>
            <button type="submit" className={styles.button}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

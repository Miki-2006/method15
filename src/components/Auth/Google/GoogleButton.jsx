import styles from "./button.module.css";
import supabase from "../../../services/supabase";

const GoogleButton = () => {

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>
        <div className={styles.line}></div>
        <span className={styles.orText}>or</span>
        <div className={styles.line}></div>
      </div>

      <button className={styles.button} onClick={handleGoogleLogin}>
        Google
      </button>
    </div>
  );
};

export default GoogleButton;

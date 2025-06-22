import styles from "./password.module.css";

const PasswordInput = ({ passwordError, setPassword, isPasswordNotCorrect }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="password" className={styles.label}>
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      {isPasswordNotCorrect && (
        <b className={styles.errorText}>Password not correct!</b>
      )}
      {passwordError && (
        <b className={styles.errorText}>Password should be more than 6!</b>
      )}
    </div>
  );
};

export default PasswordInput;

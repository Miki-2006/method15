import styles from "./nickname.module.css";

const NickNameInput = ({nickName, setNickName}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="nickName" className={styles.label}>
        Nick name
      </label>
      <input
        type="text"
        id="nickName"
        placeholder="your nick name"
        required
        onChange={(e) => setNickName(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default NickNameInput;

import styles from "./checkbox.module.css";

const CheckBox = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <input
          type="checkbox"
          id="remember"
          className={styles.checkbox}
          defaultChecked={true}
        />
        <label htmlFor="remember" className={styles.label}>
          Remember me
        </label>
      </div>
    </div>
  );
};

export default CheckBox;

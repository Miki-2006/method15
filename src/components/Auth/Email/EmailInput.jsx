import styles from './email.module.css'

const EmailInput = ({email, setEmail}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        placeholder="your email"
        required
      />
    </div>
  );
};

export default EmailInput;

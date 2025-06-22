import { IoSearch } from "react-icons/io5";
import styles from "./form.module.css";

const WordTranslateForm = ({fetchDefinition, word, setWord}) => {
  return (
    <form
      onSubmit={(e) => fetchDefinition(e)}
      className={styles.form}
    >
      <input
        type="text"
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.btn}
      >
        <IoSearch className={styles.icon}/>
      </button>
    </form>
  );
};

export default WordTranslateForm;

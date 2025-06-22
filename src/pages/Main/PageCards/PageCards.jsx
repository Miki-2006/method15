import { MdQuiz } from "react-icons/md";
import styles from "./page.module.css";
import { SiDictionarydotcom } from "react-icons/si";
import { Link } from "react-router-dom";

const PageCards = () => {
  return (
    <div className={styles.container}>
      <Link to="/dictionary" className={styles.link}>
        <div className={styles.card1}>
          <SiDictionarydotcom className={styles.icon} />
          <b>Dictionary</b>
        </div>
      </Link>
      <Link to="/quizzes" className={styles.link}>
        <div className={styles.card2}>
          <MdQuiz className={styles.icon} />
          <b>Quiz</b>
        </div>
      </Link>
    </div>
  );
};

export default PageCards;

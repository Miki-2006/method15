import styles from "./quizess.module.css";
import { categories } from "../../assets/words/categories";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const navigate = useNavigate()

  const navClick = (id) => {
    navigate(`/quizzes/quiz/${id}`)
  }

  return (
    <div className={styles.quizzes}>
      <b className={styles.title}>Quizzes</b>
      <div className={styles.container}>
        <div className={styles.cards}>
          {categories.map((el, indx) => (
            <div onClick={() => navClick(el.id)} className={styles.card} key={indx}>
              <img className={styles.img} src={el.img} alt={el.name} />
              <div className={styles.content}>
                <span>{el.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;

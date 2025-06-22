import styles from "./generate.module.css";
import { Link, useParams } from "react-router-dom";

const TestGenerate = () => {
  const params = useParams()

  return (
    <div className={styles.container}>
      <b className={styles.title}>Chose method:</b>
      <div className={styles.methods}>
        <Link className={styles.definition} to={`/quizzes/quiz/${params.id}/test/def`}>by definition</Link>
        <Link className={styles.image} to={`/quizzes/quiz/${params.id}/test/img`}>by images</Link>
      </div>
    </div>
  );
};

export default TestGenerate;

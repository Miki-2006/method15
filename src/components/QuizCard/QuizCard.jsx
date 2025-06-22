import { Link, useParams } from "react-router-dom";
import styles from "./quiz.module.css";
import { categories } from "../../assets/words/categories";
import { useEffect, useState } from "react";
import { b1Words } from "../../assets/words/b1";
import { b2Words } from "../../assets/words/b2";
import { c1Words } from "../../assets/words/c1";
import { c2Words } from "../../assets/words/c2";
import { slightlyChallengingWords } from "../../assets/words/daily";
import { emotionsAndFeelings } from "../../assets/words/emotionAndFeeling";
import { idiomsAndExpressions } from "../../assets/words/idiomsAndExpressions";
import { ieltsWords } from "../../assets/words/ielts";
import { toeflWords } from "../../assets/words/toefl";

const QuizCard = () => {
  const idParam = useParams();
  const [category, setCategory] = useState(null);
  const [words, setWords] = useState(null);

  useEffect(() => {
    const [data] = categories.filter((el) => el.id === idParam.id);
    setCategory(data);
    switch (idParam.id) {
      case "B1T00":
        setWords(b1Words);
        break;
      case "B2P77":
        setWords(b2Words);
        break;
      case "C1K44":
        setWords(c1Words);
        break;
      case "C2F11":
        setWords(c2Words);
        break;
      case "EVERYDAY32":
        setWords(slightlyChallengingWords);
        break;
      case "TOEFL54":
        setWords(toeflWords);
        break;
      case "IELTS76":
        setWords(ieltsWords);
        break;
      case "IDIOMS98":
        setWords(idiomsAndExpressions);
        break;
      case "EMOTIONS09":
        setWords(emotionsAndFeelings);
        break;

      default:
        break;
    }
  }, [idParam]);

  return (
    <div className={styles.container}>
      {category && (
        <div className={styles.top}>
          <b className={styles.title}>{category.name}</b>
          <Link className={styles.btn} to="test">
            Go to test
          </Link>
        </div>
      )}
      {words && (
        <div className={styles.cards}>
          {words.map((el, indx) => (
            <div className={styles.card} key={indx}>
              <div className={styles.left}>
                <span>{el.word}</span>
                <p className={styles.cotent}>{el.definition}</p>
              </div>
              <img className={styles.img} src={el.image} alt={el.word} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCard;

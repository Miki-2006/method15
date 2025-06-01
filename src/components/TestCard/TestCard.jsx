import styles from "./testcard.module.css";

const TestCard = ({
  wordData,
  confusingWords,
  onSelect,
  selectedAnswer,
  showAnswer,
}) => {
  return (
    <div className={styles.card}>
      <h2 className="text-sm text-gray-600 dark:text-gray-400 font-bold text-xl">{wordData.definition}</h2>
      <div className={styles.options}>
        {confusingWords.map((option) => {
          let optionClass = styles.option;

          if (showAnswer) {
            if (option.word === wordData.word) {
              optionClass += ` ${styles.correct}`;
            } else if (selectedAnswer === option.word) {
              optionClass += ` ${styles.incorrect}`;
            }
          }

          return (
            <button
              key={option.id}
              className={optionClass}
              onClick={() => onSelect(option.word)}
              disabled={showAnswer} // блокируем кнопки после выбора
            >
              {option.word}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TestCard;

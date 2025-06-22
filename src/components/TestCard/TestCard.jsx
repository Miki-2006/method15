import styles from "./testcard.module.css";

const TestCard = ({
  wordData,
  confusingWords,
  onSelect,
  selectedAnswer,
  showAnswer,
  testMethod,
  length,
  selectedWord
}) => {
  return (
    <div className={styles.card}>
      {testMethod === "definition" ? (
        <h3 className={styles.title}>
          {wordData.definition}
        </h3>
      ) : (
        ""
      )}
      {testMethod === "image" ? (
        <div className={styles.imgblock}><img src={wordData.image} alt={wordData.word} className={styles.img} /></div>
      ) : (
        ""
      )}
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
      <span className={styles.length}>{selectedWord + 1} / {length}</span>
    </div>
  );
};

export default TestCard;

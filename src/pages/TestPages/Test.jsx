import { useState, useEffect } from "react";
import { getConfusingWords } from "../../services/datamuse";
import TestCard from "../../components/TestCard/TestCard";
import Results from "./Results/Results";
import styles from "./test.module.css";
import { useParams } from "react-router-dom";
import { categories } from "../../assets/words/categories";
import { b1Words } from "../../assets/words/b1";
import { b2Words } from "../../assets/words/b2";
import { c1Words } from "../../assets/words/c1";
import { c2Words } from "../../assets/words/c2";
import { emotionsAndFeelings } from "../../assets/words/emotionAndFeeling";
import { idiomsAndExpressions } from "../../assets/words/idiomsAndExpressions";
import { slightlyChallengingWords } from "../../assets/words/daily";
import { ieltsWords } from "../../assets/words/ielts";
import { toeflWords } from "../../assets/words/toefl";

const Test = () => {
  const [words, setWords] = useState(null);
  const [confusingWords, setConfusingWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [testMethod, setTestMethod] = useState(null);

  useEffect(() => {
    switch (params.method) {
      case "def":
        setTestMethod("definition")
        break;
      case "img":
        setTestMethod("image")
        break;
      default:
        break;
    }
    const [data] = categories.filter((el) => el.id === params.id);
    setCategory(data);
    switch (params.id) {
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
  }, [params]);

  useEffect(() => {
    const prepareOptions = async () => {
      if (words?.length === 0) return;
      const wordData = words?.[selectedWord];
      const confusing = await getConfusingWords(wordData?.word);
      const choices = [wordData?.word, ...confusing.map((w) => w.word)].slice(
        0,
        4
      );
      const shuffled = choices
        .map((w) => ({ word: w, id: Math.random().toString(36) }))
        .sort(() => 0.5 - Math.random());
      setConfusingWords(shuffled);
    };
    prepareOptions();
  }, [selectedWord, words]);

  const handleSelect = (selected) => {
    if (showAnswer) return;
    setSelectedAnswer(selected);
    setShowAnswer(true);
    const correct = words[selectedWord].word;
    if (selected === correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
    setTimeout(() => {
      if (selectedWord + 1 < words.length) {
        setSelectedWord((prev) => prev + 1);
      } else {
        setFinished(true);
      }
      setSelectedAnswer(null);
      setShowAnswer(false);
    }, 1500);
  };

  const handleRestart = () => {
    setSelectedWord(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setFinished(false);
  };

  return (
    <div className={styles.container}>
      {category && (
        <div className={styles.block}>
          {finished ? (
            <Results
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              handleRestart={handleRestart}
            />
          ) : (
            words?.length > 0 &&
            confusingWords?.length > 0 && (
              <TestCard
                testMethod={testMethod}
                wordData={words[selectedWord]}
                confusingWords={confusingWords}
                onSelect={handleSelect}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
                length={words.length}
                selectedWord={selectedWord}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Test;

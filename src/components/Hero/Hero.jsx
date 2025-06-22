import styles from "./hero.module.css";
import Lottie from "react-lottie";
import HeroAnimation from "../../assets/animations/hero.json";
import { useEffect, useState } from "react";
import { getRandomWord } from "../../services/randomWord";

const Hero = () => {
  const [randomWord, setRandomWord] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HeroAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getWord = async () => {
      const [wordData] = await getRandomWord();
      setRandomWord(wordData);
    };
    getWord()
  }, []);
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h2>{randomWord?.word}</h2>
        <p>{randomWord?.definition}</p>
      </div>
      <div className={styles.lottie}><Lottie options={defaultOptions} /></div>
    </div>
  );
};

export default Hero;

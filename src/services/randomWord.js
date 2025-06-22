import { wordsForRandom } from "../assets/words/wordsForRandom";


export function getRandomWord() {
  const randomWord = wordsForRandom.filter(el => el.id === Math.floor(Math.random() * 100))
  return randomWord
}
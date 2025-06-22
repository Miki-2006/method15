import { useNavigate } from "react-router-dom";
// import styles from "./results.module.css";

const Results = ({ correctCount, incorrectCount, handleRestart }) => {
  const navigate = useNavigate();

  const handleGoProfile = () => {
    const curretUrl = window.location.href.split("/")
    curretUrl.pop()
    const newUrl = curretUrl.join('/')
    navigate(newUrl);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Results</h2>
      <p className="dark:text-white">Corrects: {correctCount}</p>
      <p className="dark:text-white">Incorects: {incorrectCount}</p>
      <div className="flex justify-between gap-4 mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleRestart}
        >
          Again
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={handleGoProfile}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Results;

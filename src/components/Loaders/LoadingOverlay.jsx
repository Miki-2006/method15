import { FaCheckCircle } from "react-icons/fa";
import Lottie from "react-lottie";
import loader from '../../assets/animations/Animation - 1749549598338.json'
import styles from './loader.module.css'

const LoadingOverlay = ({loading, success}) => {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loader,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  return (
    (loading || success) && (
      <div className={styles.overlay}>
        {loading && <Lottie options={defaultOptions} height={300} width={300} />}
        {success && <FaCheckCircle className={styles.check} />}
      </div>
    )
  );
}

export default LoadingOverlay
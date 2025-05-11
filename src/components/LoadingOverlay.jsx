import { RingLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";

const LoadingOverlay = ({loading, success}) => {
  return (
    (loading || success) && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {loading && <RingLoader color="#4F46E5" />}
        {success && <FaCheckCircle className="text-green-500 text-6xl" />}
      </div>
    )
  );
}

export default LoadingOverlay
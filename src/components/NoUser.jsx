import { FaUserCircle } from "react-icons/fa"

const NoUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="flex flex-col bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <FaUserCircle className="text-4xl text-gray-700 dark:text-gray-300 mr-2" />
          <b className="text-2xl font-bold dark:text-gray-200">
            No user!
          </b>
        </div>
        <a href="/sign-in" className="text-center text-gray-600 dark:text-gray-400 text-2xl">Login</a>
      </div>
    </div>
  )
}

export default NoUser
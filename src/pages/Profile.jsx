import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import SavedWords from "../components/SavedWords";
import NoUser from "../components/NoUser";
import { IoIosLogOut } from "react-icons/io";

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } 
  }, []);

  if (!user) {
    return <NoUser/>
  }

  const LogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950 mb-20">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <FaUserCircle className="text-4xl text-gray-700 dark:text-gray-300 mr-2" />
          <h1 className="text-2xl font-bold dark:text-gray-200">
            {user?.nickName}
          </h1>
          <IoIosLogOut className="text-3xl text-gray-700 dark:text-gray-300 ml-32" onClick={LogOut}/>
        </div>
        <SavedWords userNickName={user?.nickName}/>
      </div>
    </div>
  )
}

export default Profile
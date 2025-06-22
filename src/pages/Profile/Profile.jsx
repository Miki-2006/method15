import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import SavedWords from "../../components/SavedWords/SavedWords";
import NoUser from "../../components/Auth/NoUser/NoUser";
import { IoIosLogOut } from "react-icons/io";
import styles from './profile.module.css'

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setUserData(JSON.parse(localStorage.getItem('user')))     
    }
    getUser()
  }, [])

  if (!userData) {
    return <NoUser />;
  }

  const LogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaUserCircle className={styles.userIcon} />
          <h1 className={styles.nick}>{userData?.nickName}</h1>
          <IoIosLogOut className={styles.logoutIcon} onClick={LogOut} />
        </div>
        <SavedWords user={userData} />
      </div>
    </div>
  );
};

export default Profile;

import { FaUserCircle } from "react-icons/fa"
import styles from './nouser.module.css'

const NoUser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaUserCircle className={styles.icon} />
          <b className={styles.textBold}>No user!</b>
        </div>
        <a href="/sign-in" className={`${styles.loginLink} dark:${styles.loginLinkDark}`}>
          Login
        </a>
      </div>
    </div>
  )
}

export default NoUser
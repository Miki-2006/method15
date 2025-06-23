import styles from "./appbar.module.css";

const AppBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <a href="/" className={styles.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path d="M3 12l9-9 9 9M4 10v10h6v-6h4v6h6V10" />
            </svg>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/profile" className={styles.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.535 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="/profile" className={styles.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.535 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Profile</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AppBar;

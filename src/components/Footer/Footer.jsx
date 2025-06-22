import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <span className={styles.year}>©2025</span>
        <span className={styles.logo}>Tilingo</span>
    </footer>
  )
}

export default Footer
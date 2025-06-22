import styles from "./main.module.css";
import Hero from "../../components/Hero/Hero";
import PageCards from "./PageCards/PageCards";

const Main = () => {

  return (
    <div className={styles.main}>
      <Hero/>
      <PageCards/>
    </div>
  );
};

export default Main;

import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = () => (
  <div className={styles["loading-wrapper"]}>
    <div className={styles.spinner} />
    <span>Loading...</span>
  </div>
);

export default LoadingIndicator;

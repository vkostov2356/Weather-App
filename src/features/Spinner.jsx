import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default Spinner;

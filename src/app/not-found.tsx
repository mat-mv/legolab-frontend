import Link from "next/link";
import styles from "./not-found.module.css";
import Button from "./components/button";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Diese Seite existiert nicht oder wurde entfernt.
      </p >
      <div className={styles.ctas}>
        <Button href="/" secondary={true}>{"Zurück zur Startseite"}</Button>
      </div>
      
      
    </div>
  );
}

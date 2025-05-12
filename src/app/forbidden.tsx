"use client";

import Button from "./components/button";
import Link from "next/link";
import styles from "./forbidden.module.css";

export default function Forbidden() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>403 - Forbidden</h1>
      <p className={styles.description}>
        Sie haben keine Berechtigung, diese Seite zu sehen.
      </p>
      <div className={styles.ctas}>
        <Button href="/" secondary={true}>{"Zurück zur Startseite"}</Button>
      </div>
      
    </div>
  );
}
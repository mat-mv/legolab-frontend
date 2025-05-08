"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./error.module.css";
import Button from "./components/button";

export default function ServerError({ error, reset }: { error: Error; reset: () => void }) {
  const pathname = usePathname(); // Aktuellen Pfad abrufen

  if (process.env.NODE_ENV === "development") {
    // Hier auskommentieren, um die 500-Fehlerseite im Entwicklungsmodus anzuzeigen
    //throw error;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>500 - Server Error</h1>
      <p className={styles.description}>
        Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
      </p>

      <div className={styles.ctas}>
        <Button href={pathname} secondary={true}>{"Erneut versuchen"}</Button>
        <Button href="/" secondary={false}>{"Zurück zur Startseite"}</Button>
      </div>
      
    </div>
  );
}
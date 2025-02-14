import Link from "next/link"
import styles from "./Footer.module.css"
import Image from "next/image"

export default function Header() {
    return (
        <footer className={styles.footer}>
            <section className="content">
                <div className={styles.info}>
                    <div>
                        <p className={styles.logo}><strong>Hochschule Karlsruhe</strong><br/>University of<br/>Applied Sciences</p>
                        <p>Fakultät für Informatik und Wirtschaftsinformatik</p>
                        <p>Tel.: +49 721 925-1411<br/>matthias.mruzek-vering@h-ka.de</p>
                    </div>
                    <div>
                        <p>
                            <strong>Matthias Mruzek-Vering M.Sc.</strong><br/>Operative Leitung
                        </p>
                        <p>
                            <strong>Prof. Dr. rer. pol. Uwe Haneke</strong><br/>Operative Leitung
                        </p>
                    </div>
                </div>
                <div className={styles.links}>
                    <a target="_blank" href="https://www.h-ka.de/impressum" rel="noopener noreferrer">Impressum</a>
                    <a target="_blank" href="https://www.h-ka.de/datenschutz" rel="noopener noreferrer">Datenschutz</a>
                </div>
            </section>
            
        </footer>
    )
}
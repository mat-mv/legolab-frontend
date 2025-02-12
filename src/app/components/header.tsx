import Link from "next/link"
import styles from "./Header.module.css"
import NavLink from "./nav_link"
import Button from "./button"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`content ${styles.container}`}>
                <ul className={styles.link_list}>
                    <Link href="/" className={styles.logo}>lego::lab</Link>
                    <NavLink href="/buch">Buch</NavLink>
                    <NavLink href="/labor">Labor</NavLink>
                    <NavLink href="/mindstorms">MINDSTORMS®</NavLink>
                    <NavLink href="/gestalten">Gestalten</NavLink>
                    <NavLink href="/programmierung">Programmierung</NavLink>
                    <NavLink href="/links">Links</NavLink>
                    <NavLink href="/team">Team</NavLink>
                </ul>
            </div>
        </header>
    )
}
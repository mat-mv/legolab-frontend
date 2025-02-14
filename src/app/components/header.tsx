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
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/bots">Bots</NavLink>
                    <NavLink href="/mindstorms">Mindstorms</NavLink>
                    <NavLink href="/build">Build</NavLink>
                    <NavLink href="/code">Code</NavLink>
                    <NavLink href="/links">Links</NavLink>
                    <NavLink href="/team">Team</NavLink>
                </ul>
            </div>
        </header>
    )
}
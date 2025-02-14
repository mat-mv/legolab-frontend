"use client";
import Link from "next/link"
import styles from "./Header.module.css"
import NavLink from "./nav_link"
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`content ${styles.header}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>lego::lab</Link>
                <ul className={styles.link_list}>
                    <NavLink href="/buch">Buch</NavLink>
                    <NavLink href="/labor">Labor</NavLink>
                    <NavLink href="/mindstorms">MINDSTORMS®</NavLink>
                    <NavLink href="/gestalten">Gestalten</NavLink>
                    <NavLink href="/programmierung">Programmierung</NavLink>
                    <NavLink href="/links">Links</NavLink>
                    <NavLink href="/team">Team</NavLink>
                </ul>
                <button onClick={toggleMobileMenu} className={`material-symbols-outlined ${styles.menu_button}`}>{isMobileMenuOpen ? "close" : "menu"}</button>
            </div>
            <div className={`${styles.mobile_menu} ${isMobileMenuOpen ? styles.active : ""}`}>
                <NavLink href="/buch">Buch</NavLink>
                <NavLink href="/labor">Labor</NavLink>
                <NavLink href="/mindstorms">MINDSTORMS®</NavLink>
                <NavLink href="/gestalten">Gestalten</NavLink>
                <NavLink href="/programmierung">Programmierung</NavLink>
                <NavLink href="/links">Links</NavLink>
                <NavLink href="/team">Team</NavLink>
            </div>
        </header>
    )
}
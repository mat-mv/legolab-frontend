"use client";
import Link from "next/link"
import styles from "./Header.module.css"
import NavLink from "./nav_link"
import { useState } from "react";
import { type Header } from "./header"

export default function MobileMenu({links}:Header) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`content ${styles.mobile}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>lego::lab</Link>
        <button onClick={toggleMobileMenu} className={`material-symbols-outlined ${styles.menu_button}`}>{isMobileMenuOpen ? "close" : "menu"}</button>
      </div>
      <div className={`${styles.mobile_menu} ${isMobileMenuOpen ? styles.active : ""}`}>
        {links.map((l) => (
          <NavLink key={l.id} href={l.href}>{l.label}</NavLink>
        ))}
      </div>
    </div>
  )
}
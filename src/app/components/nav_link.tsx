"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavLink.module.css"

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <li className={styles.list_item}>
      <Link
        href={href}
        className={[isActive ? styles.active : "", styles.link].join(" ")}
      >
        {children}
      </Link>
    </li>
  );
}
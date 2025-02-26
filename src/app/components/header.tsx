import Link from "next/link"
import styles from "./Header.module.css"
import NavLink from "./nav_link"
import { fetchData } from "../utils/api";
import MobileMenu from "./mobile_menu";

interface NavigationLink {
    id: number,
    href: string,
    label: string,
}

export interface Header {
    links: NavigationLink[],
}



export default async function Header() {

    const strapiData:any = await fetchData("main-navigation?populate=*")
    const header:Header = strapiData.data


    return (
        <header className={styles.header}>
            <div className={`content ${styles.desktop}`}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>lego::lab</Link>
                    <ul className={styles.link_list}>
                        {header.links.map((l) => (
                            <NavLink key={l.id} href={l.href}>{l.label}</NavLink>
                        ))}
                    </ul>
                </div>
            </div>
            <MobileMenu links={header.links}></MobileMenu>
        </header>
    )
}
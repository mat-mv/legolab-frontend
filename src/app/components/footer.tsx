import styles from "./Footer.module.css"
import { fetchData } from "../utils/api"

interface Person {
    id: number,
    name: string,
    role: string
}

interface Link {
    id: number,
    href: string,
    label: string,
    target: string
}

interface Footer {
    phone: string,
    email: string,
    person: Person[],
    footer_links: Link[]
}

export default async function Footer() {

    const footer:Footer = await fetchData("footer?populate=*")
    console.log(footer)

    return (
        <footer className={styles.footer}>
            <section className="content">
                <div className={styles.info}>
                    <div>
                        <p className={styles.logo}><strong>Hochschule Karlsruhe</strong><br/>University of<br/>Applied Sciences</p>
                        <p>Fakultät für Informatik und Wirtschaftsinformatik</p>
                        <p>Tel.: {footer.phone}<br/>{footer.email}</p>
                    </div>
                    <div>
                        {footer.person.map((p) => (
                            <p key={p.id}><strong>{p.name}</strong><br/>{p.role}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.links}>
                    {footer.footer_links.map((link) => (
                        <a key={link.id} target={link.target} href={link.href}>{link.label}</a>
                    ))}
                </div>
            </section>
        </footer>
    )
}
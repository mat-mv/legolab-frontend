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

interface Props {
    phone: string,
    email: string,
    person: Person[],
    footer_links: Link[]
}

export default async function Footer() {

    const strapiData:any = await fetchData("footer?populate=*")
    const props:Props = strapiData.data

    return (
        <footer className={styles.footer}>
            <section className="content">
                <div className={styles.info}>
                    <div>
                        <p className={styles.logo}><strong>Hochschule Karlsruhe</strong><br/>University of<br/>Applied Sciences</p>
                        <p>Fakultät für Informatik und Wirtschaftsinformatik</p>
                        <p>Tel.: {props.phone}<br/>{props.email}</p>
                    </div>
                    <div>
                        {props.person.map((p) => (
                            <p key={p.id}><strong>{p.name}</strong><br/>{p.role}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.links}>
                    {props.footer_links.map((link) => (
                        <a key={link.id} target={link.target} href={link.href}>{link.label}</a>
                    ))}
                </div>
            </section>
        </footer>
    )
}
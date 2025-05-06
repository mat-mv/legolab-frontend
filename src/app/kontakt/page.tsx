import styles from "./page.module.css"
import { fetchData } from "../utils/api";
import ContactForm from "@/app/components/forms/contact_form"

interface KontaktPage {
    title: string,
    description: string,
}

export default async function Kontakt() {

    const strapiData:any = await fetchData("kontakt")
    const home:KontaktPage = strapiData.data

    return (
        <section className={styles.col_3}>
            <div>
                <h1>{home.title}</h1>
                <p>{home.description}</p>
            </div>
            <ContactForm/>
        </section>
    );
}
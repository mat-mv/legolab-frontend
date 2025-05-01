"use client";

import { useActionState } from "react";
import { sendContactFormAction } from "@/app/utils/actions/contact-actions"
import styles from "./page.module.css"

const INITIAL_STATE = {
    data: null,
};

export default function Kontakt() {
    
    const [formState, formAction, isPending] = useActionState(sendContactFormAction, INITIAL_STATE);

    return(
        <section>
            <form action={formAction}>
                {formState?.message && <p>{formState.message}</p>}
                {formState?.strapiErrors && <p>{formState.strapiErrors}</p>}
                <div className={styles.input_field}>
                <label htmlFor="vorname">Vorname</label>
                {formState?.zodErrors?.vorname && (
                    <div className={styles.error}>
                    {formState.zodErrors.vorname}
                    </div>
                )}
                <input id="vorname" name="vorname" type="text"></input>
                
                </div>
                <div className={styles.input_field}>
                <label htmlFor="nachname">Nachname</label>
                <input id="nachname" name="nachname" type="text"></input>
                {formState?.zodErrors?.nachname && <div className={styles.error}>{formState.zodErrors.nachname}</div>}
                </div>
                <div className={styles.input_field}>
                <label htmlFor="email">E-Mail-Adresse</label>
                <input id="email" name="eMailAdresse" type="email"></input>
                {formState?.zodErrors?.eMailAdresse && <div className={styles.error}>{formState.zodErrors.eMailAdresse[0]}</div>}
                </div>
                <div className={styles.input_field}>
                <label htmlFor="nachricht">Nachricht</label>
                <textarea id="nachricht" name="nachricht"></textarea>
                {formState?.zodErrors?.nachricht && (
                    <div className={styles.error}>
                    {formState.zodErrors.nachricht}
                    </div>
                )}
                </div>
                <button disabled={isPending}>Absenden</button>
            </form>
        </section>
    );
}
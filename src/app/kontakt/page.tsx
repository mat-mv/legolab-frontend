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
                <label htmlFor="vorname" className={formState?.zodErrors?.vorname && (styles.error)}>Vorname</label>
                {formState?.zodErrors?.vorname && (
                    <div className={[styles.error, styles.message].join(' ')}>
                        {formState.zodErrors.vorname}
                    </div>
                )}
                <input id="vorname" name="vorname" type="text" defaultValue={formState?.values?.vorname} className={formState?.zodErrors?.vorname && (styles.error)}></input>
                </div>
                <div className={styles.input_field}>
                <label htmlFor="nachname" className={formState?.zodErrors?.nachname && (styles.error)}>Nachname</label>
                {formState?.zodErrors?.nachname && <div className={[styles.error, styles.message].join(' ')}>{formState.zodErrors.nachname}</div>}
                <input id="nachname" name="nachname" type="text" defaultValue={formState?.values?.nachname} className={formState?.zodErrors?.nachname && (styles.error)}></input>
                </div>
                <div className={styles.input_field}>
                <label htmlFor="email" className={formState?.zodErrors?.eMailAdresse && (styles.error)}>E-Mail-Adresse</label>
                {formState?.zodErrors?.eMailAdresse && <div className={[styles.error, styles.message].join(' ')}>{formState.zodErrors.eMailAdresse[0]}</div>}
                <input id="email" name="eMailAdresse" type="text" defaultValue={formState?.values?.eMailAdresse} className={formState?.zodErrors?.eMailAdresse && (styles.error)}></input>
                </div>
                <div className={styles.input_field}>
                <label htmlFor="nachricht" className={formState?.zodErrors?.nachricht && (styles.error)}>Nachricht</label>
                {formState?.zodErrors?.nachricht && (
                    <div className={[styles.error, styles.message].join(' ')}>
                    {formState.zodErrors.nachricht}
                    </div>
                )}
                <textarea id="nachricht" name="nachricht" defaultValue={formState?.values?.nachricht} className={formState?.zodErrors?.nachricht && (styles.error)}></textarea>
                </div>
                <button disabled={isPending}>Absenden</button>
            </form>
        </section>
    );
}
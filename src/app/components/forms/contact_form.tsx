"use client";

import { useActionState, useState } from "react";
import { sendContactFormAction } from "@/app/utils/actions/contact-actions"
import styles from "./ContactForm.module.css"
import { Lavishly_Yours } from "next/font/google";

const INITIAL_STATE = {
    data: null,
};

export default function ContactForm() {

    const [formState, formAction, isPending] = useActionState(sendContactFormAction, INITIAL_STATE);
    const [renderedAt] = useState(() => Date.now());

    return (
        <div className={styles.contact_form}>
            {formState?.message && <p className={`${formState?.success ? styles.success : styles.error} ${styles.message}`}>{formState.message}</p>}
            {formState?.strapiErrors && <p>{formState.strapiErrors}</p>}
            {!formState?.success &&
                <form  action={formAction}>
                    <div className={styles.col_2}>
                        <div className={styles.input_field}>
                            <label htmlFor="vorname" className={formState?.zodErrors?.vorname && (styles.error)}>Vorname</label>
                            {formState?.zodErrors?.vorname && (
                                <div className={[styles.error, styles.error_message].join(' ')}>
                                    {formState.zodErrors.vorname}
                                </div>
                            )}
                            <input id="vorname" maxLength={256} placeholder="Max. 256 Zeichen" name="vorname" type="text" defaultValue={formState?.values?.vorname} className={formState?.zodErrors?.vorname && (styles.error)}></input>
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="nachname" className={formState?.zodErrors?.nachname && (styles.error)}>Nachname</label>
                            {formState?.zodErrors?.nachname && <div className={[styles.error, styles.error_message].join(' ')}>{formState.zodErrors.nachname}</div>}
                            <input id="nachname" maxLength={256} placeholder="Max. 256 Zeichen" name="nachname" type="text" defaultValue={formState?.values?.nachname} className={formState?.zodErrors?.nachname && (styles.error)}></input>
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="email" className={formState?.zodErrors?.eMailAdresse && (styles.error)}>E-Mail-Adresse</label>
                        {formState?.zodErrors?.eMailAdresse && <div className={[styles.error, styles.error_message].join(' ')}>{formState.zodErrors.eMailAdresse[0]}</div>}
                        <input id="email" maxLength={256} placeholder="Max. 256 Zeichen" name="eMailAdresse" type="text" defaultValue={formState?.values?.eMailAdresse} className={formState?.zodErrors?.eMailAdresse && (styles.error)}></input>
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="nachricht" className={formState?.zodErrors?.nachricht && (styles.error)}>Nachricht</label>
                        {formState?.zodErrors?.nachricht && (
                            <div className={[styles.error, styles.error_message].join(' ')}>
                                {formState.zodErrors.nachricht}
                            </div>
                        )}
                        <textarea id="nachricht" maxLength={1000} placeholder="Max. 1000 Zeichen" name="nachricht" defaultValue={formState?.values?.nachricht} className={formState?.zodErrors?.nachricht && (styles.error)}></textarea>
                    </div>
                    <div className={styles.h_input_field}>
                        <label htmlFor="verify_email">E-Mail-Adresse bestätigen</label>
                        <input type="text" maxLength={256} id="verify_email" name="verify_email" defaultValue="" readOnly />
                    </div>
                    <input type="hidden" name="rendered_at" value={renderedAt} />
                    <button className="button" disabled={isPending}>Absenden</button>
                </form>
            }
        </div>
    )
}
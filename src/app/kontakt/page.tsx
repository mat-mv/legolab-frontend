"use client";

import { useActionState } from "react";
import { sendContactFormAction } from "@/app/utils/actions/contact-actions"

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
                <label htmlFor="vorname">Vorname</label>
                <input id="vorname" name="vorname" type="text"></input>
                {formState?.zodErrors?.vorname && (
                    <p>{formState.zodErrors.vorname}</p>
                )}
                <label htmlFor="nachname">Nachname</label>
                <input id="nachname" name="nachname" type="text"></input>
                {formState?.zodErrors?.nachname && <p>{formState.zodErrors.nachname}</p>}
                <label htmlFor="email">E-Mail-Adresse</label>
                <input id="email" name="eMailAdresse" type="email"></input>
                {formState?.zodErrors?.eMailAdresse && <p>{formState.zodErrors.eMailAdresse[0]}</p>}
                <label htmlFor="nachricht">Nachricht</label>
                <textarea id="nachricht" name="nachricht"></textarea>
                {formState?.zodErrors?.nachricht && (
                    <p>{formState.zodErrors.nachricht}</p>
                )}
                <button disabled={isPending}>Absenden</button>
            </form>
        </section>
    );
}
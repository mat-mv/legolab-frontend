"use server";

import { z, ZodEffects } from "zod";
import { postData } from "../api";

const schemaRegister = z.object({
    vorname: z.string().min(1, "Bitte gebe einen Vornamen ein."),
    nachname: z.string().min(1, "Bitte gebe einen Nachnamen ein."),
    nachricht: z.string().min(1, "Bitte gebe eine Nachricht ein."),
    eMailAdresse: z.string()
        .min(1, "Bitte gebe eine gültige E-Mail-Adresse ein.")
        .email("Bitte gebe eine gültige E-Mail-Adresse ein.")
});

export async function sendContactFormAction(prevState: any, formData: FormData) {
    const validatedFields = schemaRegister.safeParse({
        vorname: formData.get("vorname"),
        nachname: formData.get("nachname"),
        eMailAdresse: formData.get("eMailAdresse"),
        nachricht: formData.get("nachricht"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Fehlende Angaben. Bitte fülle alle Felder aus."
        }
    }

    const responseData = await postData("kontaktanfragen", validatedFields);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }


    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to send message.",
        };
    }

    return {
        ...prevState,
        zodErrors: null,
        strapiErrors: null,
        message: "Vielen Dank für deine Nachricht!"
    };
}
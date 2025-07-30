"use server";

import { z, ZodEffects } from "zod";
import { postData } from "../api";
import { verify } from "crypto";

const schemaRegister = z.object({
    vorname: z.string().min(1, "Bitte gebe einen Vornamen ein.").max(256, "Ihr Vorname ist zu lang."),
    nachname: z.string().min(1, "Bitte gebe einen Nachnamen ein.").max(256, "Ihr Nachname ist zu lang."),
    nachricht: z.string().min(1, "Bitte gebe eine Nachricht ein.").max(1000, "Ihre Nachricht ist zu lang."),
    eMailAdresse: z.string()
        .min(1, "Diese Feld darf nicht leer sein.")
        .email("Bitte gebe eine gültige E-Mail-Adresse ein.")
        .max(256, "Ihr E-Mail-Adresse ist zu lang.")
});

export async function sendContactFormAction(prevState: any, formData: FormData) {
    const rawData = {
        vorname: formData.get("vorname"),
        nachname: formData.get("nachname"),
        eMailAdresse: formData.get("eMailAdresse"),
        nachricht: formData.get("nachricht"),
        verify_email: formData.get("verify_email"),
    }

    if (rawData.verify_email !== "") {
        return {
            ...prevState,
            zodErrors: null,
            strapiErrors: null,
            message: "Absenden der Anfrage nicht möglich.",
            success: false,
            values: rawData,
        };
    }

    const validatedFields = schemaRegister.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Fehlende Angaben. Bitte fülle alle Felder aus.",
            success: false,
            values: rawData,
        }
    }

    const responseData = await postData("kontaktanfragen", validatedFields);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
            success: false,
            values: rawData,
        };
    }


    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to send message.",
            success: false,
            values: rawData,
        };
    }

    return {
        ...prevState,
        zodErrors: null,
        strapiErrors: null,
        message: "Vielen Dank für deine Nachricht!",
        success: true,
        values: rawData,
    };
}
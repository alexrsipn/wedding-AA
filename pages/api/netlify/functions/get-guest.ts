import type {NextApiRequest, NextApiResponse} from "next";
import Airtable, {FieldSet, Record} from "airtable";
import {Guest} from "@/context/GuestContext";

interface AirtableGuestFields extends FieldSet {
    FullName?: string,
    GuestDetailsList?: string,
    AssignedTickets?: number,
    ConfirmedTickets?: number,
    GuestList?: string,
    GuestCode?: string,
    Phone?: string,
    Email?: string,
    Confirmed?: string,
    InvitationStatus?: string
}

/*exports.handler = async (event: any) => {*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {guestId} = req.query;
    if (!guestId || typeof guestId !== "string") {
        return res.status(400).json({error: 'El ID del invitado es requerido'});
    }
    /*const {guestId} = event.queryStringParameters;*/
    if (!guestId) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'El ID del invitado es requerido'})
        };
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE;
    const tableName = "Invitados";

    const base = new Airtable({apiKey}).base(baseId!);

    try {
        const record: Record<AirtableGuestFields> = await base(tableName).find(guestId);

        const guest: Guest = {
            id: record.id,
            name: record.fields.FullName,
            guestListDetails: record.fields.GuestDetailsList,
            assignedTickets: record.fields.AssignedTickets,
            confirmedTickets: record.fields.ConfirmedTickets,
            guestList: record.fields.GuestList,
            guestCode: record.fields.GuestCode,
            phone: record.fields.Phone,
            email: record.fields.Email,
            confirmed: record.fields.Confirmed,
            invitationStatus: record.fields.InvitationStatus
        };

        /*return {statusCode: 200, body: JSON.stringify(guest)};*/
        return res.status(200).json(guest);
    } catch (error) {
        console.log(error);
        /*return {statusCode: 404, body: JSON.stringify({error: "Invitado no encontrado"})}*/
        return res.status(404).json({error: "Invitado no encontrado"})
    }
}
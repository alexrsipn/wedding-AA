import type {NextApiRequest, NextApiResponse} from "next";
import {FieldSet} from "airtable";
import { base, tableName } from "../utils/airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string;
    ConfirmedTickets?: number;
    CheckedIn?: boolean;
    CheckedInTime?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'});
    }

/*    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE;
    const tableName = "Invitados";

    const base = new Airtable({apiKey}).base(baseId!);*/

    try {
        const allRecords = await base(tableName.invitados!).select({
            fields: ["FullName", "ConfirmedTickets", "InvitationStatus", "CheckedIn", "CheckedInTime"],
            sort: [{field: "CheckedInTime", direction: "desc"}],
        }).all();

        /*const guests = await  base(tableName).select({fields: ["FullName"]}).all();*/
        const totalGuests = allRecords.length;

/*        const checkedInGuests = records.map(record => ({
            name: record.fields.FullName,
            tickets: record.fields.ConfirmedTickets,
            time: record.fields.CheckedInTime
        }));*/

        const checkedInGuests = allRecords.filter(record => record.fields.CheckedIn).map(record => ({
            name: record.fields.FullName,
            tickets: record.fields.ConfirmedTickets,
            time: record.fields.CheckedInTime
        }));

        return res.status(200).json({checkedInGuests, totalGuests});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Failed to fetch checkin guests'})
    }
}
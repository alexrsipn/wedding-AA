import type {NextApiRequest, NextApiResponse} from "next";
import Airtable, {FieldSet} from "airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string;
    ConfirmedTickets?: number;
    CheckedInTime?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({messge: 'Method not allowed'});
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE;
    const tableName = "Invitados";

    const base = new Airtable({apiKey}).base(baseId!);

    try {
        const records = await base(tableName).select({
            filterByFormula: "{CheckedIn} = 1",
            sort: [{field: "CheckedInTime", direction: "desc"}]
        }).all();

        const guests = await  base(tableName).select({fields: ["FullName"]}).all();
        const totalGuests = guests.length;

        const checkedInGuests = records.map(record => ({
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
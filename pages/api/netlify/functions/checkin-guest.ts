import type {NextApiRequest, NextApiResponse} from 'next';
import Airtable, {FieldSet, Record} from "airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string;
    CheckedIn?: boolean;
    ConfirmedTickets?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(400).json({status: 'error', message: 'El ID del invitado es requerido'});
    }

    const {guestId} = req.body;

    if (!guestId || typeof guestId !== 'string') {
        return res.status(400).json({status: 'error', message: 'El ID del invitado es requerido'});
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE;
    const tableName = "Invitados";

    const base = new Airtable({apiKey}).base(baseId!);

    try {
        const date = new Date();
        const record: Record<AirtableGuestFields> = await base(tableName).find(guestId);

        if (record.fields.CheckedIn) {
            return res.status(200).json({status: 'already_checked_in', message: 'Este invitado ya ingresó', guest: record.fields});
        }

        await base(tableName).update([
            {
                "id": guestId,
                "fields": {
                    "CheckedIn": true,
                    "CheckedInTime": date.toISOString()
                }
            }
        ]);

        return res.status(200).json({status: 'success', message: 'Checkin exitoso', guest: record.fields});
    } catch (error) {
        console.error(error);
        return res.status(404).json({status: 'not_found', error: 'Invitado no encontrado.'});
    }
}
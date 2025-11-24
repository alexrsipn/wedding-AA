import type { NextApiRequest, NextApiResponse } from 'next';
import {FieldSet, Record} from "airtable";
import {base, tableName} from "../utils/airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string;
    CheckedIn?: boolean;
    ConfirmedTickets?: number;
    InvitationStatus?: string;
    SpecialException?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(400).json({status: 'error', message: 'El ID del invitado es requerido'});
    }

    const {guestId} = req.body;

    if (!guestId || typeof guestId !== 'string') {
        return res.status(400).json({status: 'error', message: 'El ID del invitado es requerido'});
    }

    try {
        const date = new Date();
        const record: Record<AirtableGuestFields> = await base(tableName.invitados!).find(guestId);

        if (record.fields.InvitationStatus === "Declined") {
            return res.status(403).json({status: 'error', message: 'El invitado declinó la invitación y no puede registrarse.'})
        }

        if (record.fields.CheckedIn) {
            return res.status(200).json({status: 'already_checked_in', message: 'Invitado registrado previamente', guest: record.fields});
        }

        const updatedRecords = await base(tableName.invitados!).update([
            {
                "id": guestId,
                "fields": {
                    "CheckedIn": true,
                    "CheckedInTime": date.toISOString()
                }
            }
        ]);

        return res.status(200).json({status: 'success', message: 'Checkin exitoso', guest: updatedRecords[0].fields});
    } catch (error) {
        console.error(error);
        return res.status(404).json({status: 'not_found', error: 'Invitado no encontrado.'});
    }
}
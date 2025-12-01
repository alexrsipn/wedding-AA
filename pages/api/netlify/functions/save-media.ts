import type { NextApiRequest, NextApiResponse } from "next";
import { base } from "../utils/airtable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { guestId, mediaUrl, isPublic, mediaType } = req.body;

    if (!guestId || !mediaUrl || typeof isPublic !== 'boolean' || !mediaType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
/*        const guestRecord = await base(tableName.invitados!).find(guestId);
        if (!guestRecord || guestRecord.fields.InvitationStatus !== 'Confirmed') {
            return res.status(403).json({ message: 'Invitado no autorizado.'});
        }*/

        await base('EventMedia').create([
            {
                fields: {
                    'Uploader': [guestId],
                    'MediaURL': mediaUrl,
                    'isPublic': isPublic,
                    'MediaType': mediaType,
                },
            },
        ]);

        res.status(200).json({status: 'success', message: '¡Gracias por compartir tu momento en nuestra boda!'});
    } catch (error) {
        console.log('Error saving media to Airtable: ', error);
        res.status(500).json({status: 'error', message: 'No se pudo guardar la información del archivo.'})
    }
}
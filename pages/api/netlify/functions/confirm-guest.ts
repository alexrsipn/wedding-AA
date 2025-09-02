import type {NextApiRequest, NextApiResponse} from "next";
import Airtable from "airtable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    try {
        const {guestId, isConfirmed, attendees} = req.body;
        if (!guestId) {
            return res.status(400).json({error: 'El ID del invitado es requerido'})
        }

        const apiKey = process.env.AIRTABLE_API_KEY;
        const baseId = process.env.AIRTABLE_BASE;
        const tableName = "Invitados";

        const base = new Airtable({apiKey}).base(baseId!);

        await base (tableName).update([
            {
                "id": guestId,
                "fields": {
                    "Confirmed": isConfirmed ? "Sí" : "No",
                    "ConfirmedTickets": attendees
                }
            }
        ]);

        /*return {statusCode: 200, body: JSON.stringify({message: 'Confirmación exitosa'})}*/
        return res.status(200).json({message: "Confirmación exitosa"});
    } catch (error) {
        console.error(error);
        /*return {statusCode: 500, body: JSON.stringify({error: 'Error al actualizar la confirmación'})}*/
        return res.status(500).json({error: 'Error al actualizar la confirmación'});
    }
}
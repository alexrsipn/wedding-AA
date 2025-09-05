import type {NextApiRequest, NextApiResponse} from "next";
import Airtable from "airtable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    try {
        const {GuestId, Confirmed, ConfirmedTickets, ConfirmedAttendees, InvitationStatus} = req.body;
        if (!GuestId) {
            return res.status(400).json({error: 'El ID del invitado es requerido'})
        }

        const apiKey = process.env.AIRTABLE_API_KEY;
        const baseId = process.env.AIRTABLE_BASE;
        const tableName = "Invitados";

        const base = new Airtable({apiKey}).base(baseId!);

        const body = {
            "id": GuestId,
            "fields": {
                "Confirmed": Confirmed,
                "ConfirmedTickets": ConfirmedTickets,
                "ConfirmedAttendees": ConfirmedAttendees.join(";"),
                "InvitationStatus": InvitationStatus
            }
        }
        console.log(body);
        await base (tableName).update([body]);

/*        await base (tableName).update([
            {
                "id": GuestId,
                "fields": {
                    "Confirmed": Confirmed,
                    "ConfirmedTickets": attendees
                }
            }
        ]);*/

        return res.status(200).json({message: "Confirmación exitosa"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Error al actualizar la confirmación'});
    }
}
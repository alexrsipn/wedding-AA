import Airtable from "airtable";

exports.handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        return {statusCode: 405, body: 'Method Not Allowed'}
    }

    try {
        const {guestId, isConfirmed, attendees} = JSON.parse(event.body)
        if (!guestId) {
            return {statusCode: 400, body: JSON.stringify({error: 'El ID del invitado es requerido'})}
        }

        const apiKey = process.env.AIRTABLE_API_KEY;
        const baseId = process.env.AIRTABLE_BASE;
        const tableName = "Invitados";

        const base = new Airtable({apiKey}).base(baseId!);

        await base (tableName).update([
            {
                "id": guestId,
                "fields": {
                    "Confirmed": isConfirmed,
                    "AssignedTickets": attendees
                }
            }
        ]);

        return {statusCode: 200, body: JSON.stringify({message: 'Confirmación exitosa'})}
    } catch (error) {
        console.error(error);
        return {statusCode: 500, body: JSON.stringify({error: 'Error al actualizar la confirmación'})}
    }
}
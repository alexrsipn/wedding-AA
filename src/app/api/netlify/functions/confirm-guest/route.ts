import { NextRequest, NextResponse } from "next/server";
import { base, tableName} from "@/lib/airtable";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {GuestId, Confirmed, ConfirmedTickets, ConfirmedAttendees, InvitationStatus, DeclineReason} = body;
        if (!GuestId) {
            return NextResponse.json({ error: 'El ID del invitado es requerido' }, { status: 400 });
        }

        const airtablePayload = {
            "id": GuestId!,
            "fields": {
                "Confirmed": Confirmed ?? false,
                "ConfirmedTickets": ConfirmedTickets ?? 0,
                "ConfirmedAttendees": ConfirmedAttendees ?? '',
                "InvitationStatus": InvitationStatus ?? '',
                "DeclineReason": DeclineReason ?? ''
            }
        }
        console.log(airtablePayload);
        await base(tableName.invitados!).update([airtablePayload]);

        return NextResponse.json({ message: "Confirmación exitosa" }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: "JSON no válido" }, { status: 400 })
        }
        return NextResponse.json({ error: "Error al actualizar la confirmación" }, { status: 500 });
    }
}
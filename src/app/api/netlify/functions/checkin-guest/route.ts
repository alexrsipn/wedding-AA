import { NextRequest, NextResponse } from "next/server";
import {FieldSet, Record} from "airtable";
import {base, tableName} from "@/lib/airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string;
    CheckedIn?: boolean;
    ConfirmedTickets?: number;
    InvitationStatus?: string;
    SpecialException?: boolean;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { guestId } = body;

    if (!guestId) {
        return NextResponse.json({ error: 'El ID del invitado es requerido' }, { status: 400 });
    }

    try {
        const date = new Date();
        const record: Record<AirtableGuestFields> = await base(tableName.invitados!).find(guestId);

        if (record.fields.InvitationStatus === "Declined") {
            return NextResponse.json({ message: 'El invitado declinó la invitación y no puede registrarse.', status: 'error'}, { status: 403 })
        }

        if (record.fields.CheckedIn) {
            return NextResponse.json({ message: 'Invitado registrado previamente', status: 'already_checked_in', guest: record.fields }, { status: 200 })
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

        return NextResponse.json({ message: 'Checkin exitoso', status: 'success', guest: updatedRecords[0].fields }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'JSON no válido', status: 'error' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Invitado no encontrado', status: 'not_found' }, { status: 404 });
    }
}
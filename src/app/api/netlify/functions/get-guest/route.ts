import { NextRequest, NextResponse } from "next/server";
import { FieldSet, Record } from "airtable";
import { Guest } from "@/context/GuestContext";
import { base, tableName } from "@/lib/airtable";

interface AirtableGuestFields extends FieldSet {
    FullName?: string,
    GuestDetailsList?: string,
    AssignedTickets?: number,
    ConfirmedTickets?: number,
    GuestList?: string,
    GuestCode?: string,
    Phone?: string,
    Email?: string,
    Confirmed?: boolean,
    InvitationStatus?: string,
    ConfirmedAttendees?: string
}

export async function GET(request: NextRequest) {
    const guestId = request.nextUrl.searchParams.get("guestId");
    if (!guestId) {
        return NextResponse.json({ error: 'El ID del invitado es requerido' }, { status: 400 })
    }

    try {
        const record: Record<AirtableGuestFields> = await base(tableName.invitados!).find(guestId);
        const guest: Guest = {
            id: record.id,
            name: record.fields.FullName,
            guestListDetails: record.fields.GuestDetailsList,
            assignedTickets: record.fields.AssignedTickets,
            confirmedTickets: record.fields.ConfirmedTickets,
            guestList: record.fields.GuestList,
            confirmed: record.fields.Confirmed,
            invitationStatus: record.fields.InvitationStatus,
            confirmedAttendees: record.fields.ConfirmedAttendees
        };

        return NextResponse.json(guest, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Invitado no encontrado'}, { status: 500 });
    }
}
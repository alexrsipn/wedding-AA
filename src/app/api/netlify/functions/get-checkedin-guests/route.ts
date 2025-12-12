import { NextResponse } from "next/server";
import { base, tableName } from "@/lib/airtable";

export async function GET() {
    try {
        const allRecords = await base(tableName.invitados!).select({
            fields: ["FullName", "ConfirmedTickets", "InvitationStatus", "CheckedIn", "CheckedInTime"],
            sort: [{field: "CheckedInTime", direction: "desc"}],
        }).all();

        const totalGuests = allRecords.length;

        const checkedInGuests = allRecords.filter(record => record.fields.CheckedIn).map(record => ({
            name: record.fields.FullName,
            tickets: record.fields.ConfirmedTickets,
            time: record.fields.CheckedInTime
        }));

        return NextResponse.json({ checkedInGuests, totalGuests }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch checkin guests' }, { status: 500})
    }
}
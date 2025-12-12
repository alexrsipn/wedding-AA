import { NextRequest, NextResponse } from "next/server";
import { base } from "@/lib/airtable";

export async function POST(request: NextRequest) {
    try {
        const {guestId, mediaUrl, isPublic, mediaType} = await request.json();

        if (!guestId || !mediaUrl || isPublic === undefined || !mediaType) {
            return NextResponse.json({ message: "Missing required fields"}, { status: 400 });
        }
        await base('EventMedia').create([
            {
                fields: {
                    'Uploader': [guestId],
                    'MediaURL': mediaUrl,
                    'isPublic': !!isPublic,
                    'MediaType': mediaType,
                },
            },
        ]);

        return NextResponse.json({ message: '¡Gracias por compartir tu momento en nuestra boda!', status: 'success' }, { status: 200 })
    } catch (error) {
        console.log('Error saving media to Airtable: ', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'JSON no válido', status: 'error' }, { status: 400 });
        }
        return NextResponse.json({ message: 'No se pudo guardar la información del archivo.', status: 'error' }, { status: 500 })
    }
}
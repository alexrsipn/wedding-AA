import Airtable from "airtable";
import {GetGuestResponse, GetGuests} from "../types/functions-types";

exports.handler = async () => {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE;
    const tableName = "Invitados";

    const base = new Airtable({apiKey}).base(baseId!);
    try {
        const records = await base(tableName).select({
            view: 'Grid view'
        }).firstPage();

        const guests: GetGuests[] = records.map<GetGuestResponse>(record => ({
            id: record.id,
        }));

        console.log(guests);

        return {
            statusCode: 200,
            body: JSON.stringify(guests)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to fetch data'})
        };
    }
}
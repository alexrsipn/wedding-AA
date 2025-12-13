import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE;

const tableName = {
    invitados: process.env.AIRTABLE_TABLE_NAME
};

if (!apiKey || !baseId || !tableName.invitados) {
    throw new Error('Airtable enviroment variables are not properly configured.');
}

const base = new Airtable({ apiKey }).base(baseId);

export { base, tableName };
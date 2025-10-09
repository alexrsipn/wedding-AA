import Airtable from "airtable";

const isProduction = process.env.NODE_ENV === 'production';

console.log("Production enviroment: ", isProduction)

const apiKey = isProduction
    ? process.env.AIRTABLE_API_KEY_PROD
    : process.env.AIRTABLE_API_KEY_DEV;
const baseId = isProduction
    ? process.env.AIRTABLE_BASE_ID_PROD
    : process.env.AIRTABLE_BASE_ID_DEV;

const tableName = {
    invitados: isProduction
        ? process.env.AIRTABLE_TABLE_NAME_PROD
        : process.env.AIRTABLE_TABLE_NAME_DEV,
};

if (!apiKey || !baseId || !tableName) {
    throw new Error('Airtable enviroment variables are not properly configured.');
}

const base = new Airtable({ apiKey }).base(baseId);

export { base, tableName };
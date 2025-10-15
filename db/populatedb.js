#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://raven:raven123@db:5432/messages';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const main = async () => {
    console.log("seeding...");
    const client = new Client({ connectionString });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
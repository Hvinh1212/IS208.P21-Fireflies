const { neon } = require("@neondatabase/serverless")
const dotenv = require("dotenv")

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// connect
// postgresql://neondb_owner:npg_qEaj18dQiyGh@ep-misty-tooth-a58s0oy5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

module.exports = sql;
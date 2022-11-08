import { Pool } from "pg";

export const pool = new Pool({
    connectionString: 'postgres://gdev_db_user:gqxVwYBSsx0BGaKIWcyC2dAaRjp9lnki@dpg-cdc7j84gqg48t048ij60-a.ohio-postgres.render.com/gdev_db',
    ssl: {
        rejectUnauthorized: false
    }
})

pool.query("set schema 'growBank';");
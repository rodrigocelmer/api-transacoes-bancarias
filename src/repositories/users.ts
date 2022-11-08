import { User } from "../model/User";
import { pool } from "../db";

export class UserRepository {
    async getAll(): Promise<User[]> {
        const client = await pool.connect();
        client.query("set schema 'growBank';");
        const result = await client.query(
            'SELECT * FROM users'
        );
        
        client.release();

        return result.rows;
    }
}
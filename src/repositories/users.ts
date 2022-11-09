import { User } from "../model/User";
import { pool } from "../db";

const setSchema = "set schema 'growBank';";
export class UserRepository {
    async create(user: User): Promise<void>{
        const client = await pool.connect();
        client.query(setSchema);
        await client.query(
            `INSERT INTO users VALUES(
                '${user.id}',
                '${user.name}',
                '${user.cpf}',
                '${user.email}',
                '${user.age}'
            );`
        )
        client.release();
    }

    async getById(userId: string): Promise<User> {
        const client = await pool.connect();
        client.query(setSchema);
        const result = await client.query(
            `SELECT * FROM users WHERE id = '${userId}';`
        )

        client.release;

        return result.rows[0];
    }

    async getAll(): Promise<User[]> {
        const client = await pool.connect();
        client.query(setSchema);
        const result = await client.query(
            'SELECT * FROM users;'
        );
        
        client.release();

        return result.rows;
    }
}
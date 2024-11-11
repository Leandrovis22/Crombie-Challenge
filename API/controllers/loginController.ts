import { RequestHandler } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import { LoginRequestBody, User } from "../types/types";


dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

/**
 * Handles the login of a user.
 * The user is logged in if the email and password match those in the database.
 * If the login is successful, it returns a JSON response with a token.
 * If the login fails, it returns a JSON response with an error message.
 */

export const loginController: RequestHandler<{}, any, LoginRequestBody> = async (req, res): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = (await sql`
      SELECT * FROM users WHERE email = ${email}
    `) as unknown as User[];

        if (!user || user.length === 0) {
            res.status(404).json({ error: 'Email not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            res.status(401).json({ error: 'Password is incorrect' });
            return;
        }

        const token = jwt.sign(
            { userId: user[0].id },
            process.env.JWT_SECRET!,
            { expiresIn: '30m' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' });
    }
};


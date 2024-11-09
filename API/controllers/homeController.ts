import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

export const homeController = async (req: Request, res: Response): Promise<void> => {
  try {

    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await sql`
      SELECT id, first_name, last_name, email, address, loan_amount, date_of_birth, phone_number
      FROM users
      WHERE id = ${userId};
    `;

    if (user.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error('Error in homeController:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
};

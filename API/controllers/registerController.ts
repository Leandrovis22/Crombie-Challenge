import { RequestHandler } from 'express';
import { RegisterRequestBody } from '../types/types';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

export const registerController: RequestHandler<{}, any, RegisterRequestBody> = async (req, res): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      loanAmount,
      dateOfBirth,
      phoneNumber,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: 'Required fields are missing' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await sql`
        INSERT INTO users (first_name, last_name, email, password, address, loan_amount, date_of_birth, phone_number)
        VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${address}, ${loanAmount}, ${dateOfBirth}, ${phoneNumber})
        RETURNING *;
      `;

      const { password: _, ...userResult } = user[0];
      res.status(201).json({ message: 'User registered successfully', user: userResult });
    } catch (error: any) {
      console.error('Error in /register:', error);
      if (error.constraint === 'users_email_key') {
        res.status(400).json({ error: 'That email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error registering user' });
    }
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

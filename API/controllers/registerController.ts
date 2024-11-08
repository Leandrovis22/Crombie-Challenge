import { RegisterRequest, RegisterResponse } from '../controllers/types/types';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

export const registerController = async (
  req: RegisterRequest,
  res: RegisterResponse
) => {
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
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await sql`
        INSERT INTO users (first_name, last_name, email, password, address, loan_amount, date_of_birth, phone_number)
        VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${address}, ${loanAmount}, ${dateOfBirth}, ${phoneNumber})
        RETURNING *;
      `;

      const { password: _, ...userResult } = user[0];
      return res.status(201).json({ message: 'User registered successfully', user: userResult });
    } catch (error: any) {
      console.error('Error in /register:', error);
      if (error.constraint === 'users_email_key') {
        return res.status(400).json({ error: 'That email is already registered' });
      }
      return res.status(500).json({ error: 'Error registering user' });
    }
  } catch (error) {
    console.error('Error in /register:', error);
    return res.status(500).json({ error: 'Error registering user' });
  }
};
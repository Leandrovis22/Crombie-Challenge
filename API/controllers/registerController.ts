import { RequestHandler } from 'express';
import { RegisterRequestBody } from '../types/types';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

/**
 * Handles the registration of a new user.
 * The user is registered if all the required fields are present and the email is not already registered.
 * If the registration is successful, it returns a JSON response with the user data and a token.
 * If the registration fails, it returns a JSON response with an error message.
 * We use bcrypt to hash the password before storing it in the database.
 */

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

      const token = jwt.sign(
        { userId: user[0].id },
        process.env.JWT_SECRET!,
        { expiresIn: '30m' }
      );

      res.status(201).json({ message: 'User registered successfully', user: userResult, token });

    } catch (error: any) {
      
      if (error.constraint === 'users_email_key') {
        res.status(400).json({ error: 'That email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error registering user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

import { Request, Response } from 'express';

export interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  loanAmount?: number;
  dateOfBirth?: string;
  phoneNumber?: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  loan_amount: number;
  date_of_birth: string;
  phone_number: string;
  created_at: string;
}


export type RegisterRequest = Request<{}, any, RegisterRequestBody>;
export type RegisterResponse = Response;
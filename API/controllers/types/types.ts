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

export type RegisterRequest = Request<{}, {}, RegisterRequestBody>;
export type RegisterResponse = Response;
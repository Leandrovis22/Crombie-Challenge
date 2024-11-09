export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    loanAmount: number;
    dateOfBirth: Date;
    phoneNumber: string;
}

export const defaultData: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    loanAmount: '' as unknown as number,
    dateOfBirth: '' as unknown as Date,
    phoneNumber: '',
};

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    loan_amount: number;
    date_of_birth: Date;
    phone_number: string;
  }
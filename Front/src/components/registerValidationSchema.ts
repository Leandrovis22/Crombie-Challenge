import * as Yup from 'yup';
import dayjs from 'dayjs';

export const registerValidationSchema = Yup.object().shape({

    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .matches(/^[a-zA-Z]+$/, 'First name must not contain numbers or special characters'),

    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .matches(/^[a-zA-Z]+$/, 'Last name must not contain numbers or special characters'),

    email: Yup.string()
        .required('Email is required')
        .email('Email is not valid')
        .matches(/@[a-z]+\.(com|ar|es)$/, 'Email must end with .com, .ar or .es'),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password length should be at least 8 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Password must contain at least one letter, one number, and one special character'
        ),

    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),

    address: Yup.string()
        .required('Address is required')
        .min(10, 'Address must be at least 10 characters')
        .matches(/\D/, 'Address must not be only numbers'),

    loanAmount: Yup.number()
        .transform((value) => (isNaN(value) || value === '' ? 0 : value))
        .required('Loan amount is required')
        .min(25000, 'Loan amount must be at least $25,000')
        .max(250000, 'Loan amount must not exceed $250,000'),

    dateOfBirth: Yup.date()
        .typeError('Invalid date')
        .required('Date of birth is required')
        .max(dayjs().subtract(18, 'years').endOf('year'), 'You must be at least 18 years old'),

    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\+54 \d{3} \d{3} \d{4}$/, 'Phone number must be in the format +XX (XXX) XXX XXXX')

});

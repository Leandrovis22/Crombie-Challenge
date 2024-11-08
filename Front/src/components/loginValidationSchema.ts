import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({

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

});

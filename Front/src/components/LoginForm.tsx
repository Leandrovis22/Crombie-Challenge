import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from './FormField';
import { loginValidationSchema } from './loginValidationSchema';
import { useFormSubmission } from '../hooks/useFormSubmission';
import Alerts from './Alerts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(loginValidationSchema)
    });

    const { showSuccessAlert, showErrorAlert, errorMessage, submitForm } = useFormSubmission('login');

    const navigate = useNavigate();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSuccessAlert) {
            timer = setTimeout(() => navigate('/home'), 2000);
        }
        return () => clearTimeout(timer);
    }, [showSuccessAlert, navigate]);

    return (

        <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            className='form'
            aria-label="Login Form"
            role="form"
        >
            <Typography variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800 }}>
                Login
            </Typography>

            <FormField<FormValues>
                register={register}
                name="email"
                label="Email"
                type="email"
                errors={errors}
            />

            <FormField<FormValues>
                register={register}
                name="password"
                label="Password"
                type="password"
                errors={errors}
            />

            <Box className="form-button-box">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    aria-label="Submit form"
                    role="button"
                >
                    Login
                </Button>
            </Box>

            <Alerts
                showSuccessAlert={showSuccessAlert}
                showErrorAlert={showErrorAlert}
                errorMessage={errorMessage}
                alertMessage="Login successful!"
            />

        </Box>

    );
};

export default LoginForm;
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from '../components/FormField';
import { loginValidationSchema } from '../schemas/loginValidationSchema';
import { useFormSubmission } from '../hooks/useFormSubmission';
import Alerts from '../components/Alerts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginFormValues } from '../types/types';

const Login = () => {
    // Form state management using react-hook-form Handles validation through yup schema
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(loginValidationSchema)
    });

    // Custom hook to handle form submission logic and manage alert states
    const { showSuccessAlert, showErrorAlert, errorMessage, submitForm } = useFormSubmission('login');

    const navigate = useNavigate();

    // Handle redirect after successful login redirects to home page after 3 seconds
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSuccessAlert) {
            timer = setTimeout(() => navigate('/home'), 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccessAlert, navigate]);

    return (
        <Box className="form-container">
            <Box
                component="form"
                onSubmit={handleSubmit(submitForm)}
                className='form'
                aria-label="Login Form"
                role="form"
            >
                <Typography tabIndex={0} variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800 }}>
                    Login
                </Typography>

                <FormField<LoginFormValues>
                    register={register}
                    name="email"
                    label="Email"
                    type="email"
                    errors={errors}
                />

                <FormField<LoginFormValues>
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
        </Box>
    );
};

export default Login;
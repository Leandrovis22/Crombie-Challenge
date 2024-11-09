import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from '../components/FormField';
import { loginValidationSchema } from '../components/loginValidationSchema';
import { useFormSubmission } from '../hooks/useFormSubmission';
import Alerts from '../components/Alerts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface FormValues {
    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(loginValidationSchema)
    });

    const { showSuccessAlert, showErrorAlert, errorMessage, submitForm } = useFormSubmission('login');

    const navigate = useNavigate();

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
        </Box>
    );
};

export default Login;
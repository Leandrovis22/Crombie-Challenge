import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from './FormField';
import { loginValidationSchema } from './loginValidationSchema';

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(loginValidationSchema)
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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
            </Box>

    );
};

export default LoginForm;
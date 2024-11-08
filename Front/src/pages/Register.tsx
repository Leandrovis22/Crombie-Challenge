import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from '../components/FormField';
import { DateField } from '../components/DateOfBirth';
import { PhoneField } from '../components/PhoneField';
import { validationSchema } from '../components/ValidationSchema';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    loanAmount: number;
    dateOfBirth: Date;
    phoneNumber: string;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff'
        },
        secondary: {
            main: '#6c757d'
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                inputProps: {
                    'aria-required': 'true'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                role: 'button'
            }
        }
    }
});

const RegisterForm = () => {

    const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <ThemeProvider theme={theme}>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '500px',
                        margin: '0 auto',
                        padding: '2rem'
                    }}
                    aria-label="Registration Form"
                    role="form"
                >
                    <Typography variant="h1" gutterBottom sx={{ fontSize: '2.25rem' }}>
                        Register
                    </Typography>

                    <FormField<FormValues>
                        register={register}
                        name="firstName"
                        label="First Name"
                        errors={errors}
                    />

                    <FormField<FormValues>
                        register={register}
                        name="lastName"
                        label="Last Name"
                        errors={errors}
                    />

                    <FormField<FormValues>
                        register={register}
                        name="email"
                        label="Email"
                        type="email"
                        errors={errors}
                    />

                    <FormField<FormValues>
                        register={register}
                        name="address"
                        label="Address"
                        errors={errors}
                    />

                    <FormField<FormValues>
                        register={register}
                        name="loanAmount"
                        label="Loan Amount"
                        type="number"
                        min={25000}
                        max={250000}
                        errors={errors}
                    />

                    <DateField<FormValues>
                        control={control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        errors={errors}
                    />

                    <PhoneField<FormValues>
                        control={control}
                        name="phoneNumber"
                        label="Phone Number"
                        errors={errors}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        aria-label="Submit registration form"
                    >
                        Submit
                    </Button>
                </Box>

        </ThemeProvider>
    );
};

export default RegisterForm;
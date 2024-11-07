import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    FormHelperText
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MuiTelInput } from 'mui-tel-input';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff'
        },
        secondary: {
            main: '#6c757d'
        }
    }
});

const RegisterForm = () => {

    const validationSchema = Yup.object().shape({
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
            .email('Email is not valid'),
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
            .matches(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/, 'Phone number must be in the format (XXX) XXX-XXXX')
    });

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                >
                    <Typography variant="h4" gutterBottom>
                        Register
                    </Typography>

                    <TextField
                        {...register('firstName')}
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        {...register('lastName')}
                        label="Last Name"
                        variant="outlined"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        {...register('email')}
                        label="Email"
                        type="email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        {...register('address')}
                        label="Address"
                        variant="outlined"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        {...register('loanAmount', { valueAsNumber: true })}
                        slotProps={{ input: { inputProps: { min: 0 } } }}
                        label="Loan Amount"
                        type="number"
                        variant="outlined"
                        error={!!errors.loanAmount}
                        helperText={errors.loanAmount?.message}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal" error={!!errors.dateOfBirth}>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field: { onChange, value, ref } }) => (
                                <DatePicker
                                    onChange={onChange}
                                    slotProps={{ textField: { required: true } }}
                                    value={value ? dayjs(value) : null}
                                    label="Date of Birth"
                                    maxDate={dayjs().subtract(18, 'years').endOf('year')}
                                    inputRef={ref}
                                />
                            )}
                        />
                        {errors.dateOfBirth?.message && (
                            <FormHelperText>{errors.dateOfBirth.message}</FormHelperText>
                        )}
                    </FormControl>

                   

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default RegisterForm;

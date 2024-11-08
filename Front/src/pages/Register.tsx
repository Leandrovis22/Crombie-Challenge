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
    FormHelperText,
    FormLabel
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
            .matches(/^\+54 \d{3} \d{3} \d{4}$/, 'Phone number must be in the format +XX (XXX) XXX XXXX')
    });

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const visuallyHidden = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
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
                    aria-label="Registration Form"
                    role="form"
                >
                    <Typography variant="h1" gutterBottom sx={{ fontSize: '2.25rem' }}>
                        Register
                    </Typography>

                    <TextField
                        {...register('firstName')}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        slotProps={{
                            htmlInput: {
                                'aria-label': 'First Name',
                                'aria-required': 'true'
                            }
                        }}
                    />

                    <TextField
                        {...register('lastName')}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="normal"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        slotProps={{
                            htmlInput: {
                                'aria-label': 'Last Name',
                                'aria-required': 'true'
                            }
                        }}
                    />

                    <TextField
                        {...register('email')}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        slotProps={{
                            htmlInput: {
                                'aria-label': 'Email address',
                                'aria-required': 'true'
                            }
                        }}
                    />

                    <TextField
                        {...register('address')}
                        id="address"
                        label="Address"
                        variant="outlined"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        fullWidth
                        margin="normal"
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? "address-error" : undefined}
                        slotProps={{
                            htmlInput: {
                                'aria-label': 'Street address',
                                'aria-required': 'true'
                            }
                        }}
                    />

                    <TextField
                        {...register('loanAmount', { valueAsNumber: true })}
                        id="loanAmount"
                        label="Loan Amount"
                        type="number"
                        variant="outlined"
                        error={!!errors.loanAmount}
                        helperText={errors.loanAmount?.message}
                        fullWidth
                        margin="normal"
                        aria-invalid={!!errors.loanAmount}
                        aria-describedby={errors.loanAmount ? "loanAmount-error" : undefined}
                        slotProps={{
                            htmlInput: {
                                min: 25000,
                                max: 250000,
                                'aria-label': 'Loan amount in dollars',
                                'aria-required': 'true'
                            }
                        }}
                    />

                    <FormControl fullWidth margin="normal" error={!!errors.dateOfBirth}>
                        <FormLabel
                            id="dob-label"
                            sx={visuallyHidden}
                        >
                            Date of Birth
                        </FormLabel>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field: { onChange, value, ref } }) => (
                                <DatePicker
                                    onChange={onChange}
                                    value={value ? dayjs(value) : null}
                                    label="Date of Birth"
                                    maxDate={dayjs().subtract(18, 'years').endOf('year')}
                                    inputRef={ref}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                            'aria-labelledby': 'dob-label',
                                            'aria-invalid': !!errors.dateOfBirth,
                                            'aria-describedby': errors.dateOfBirth ? "dob-error" : undefined
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.dateOfBirth?.message && (
                            <FormHelperText id="dob-error">{errors.dateOfBirth.message}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.phoneNumber}>
                        <FormLabel
                            id="phone-label"
                            sx={visuallyHidden}
                        >
                            Phone Number
                        </FormLabel>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field: { onChange, value } }) => (
                                <MuiTelInput
                                    value={value || ''}
                                    onChange={onChange}
                                    label="Phone Number"
                                    defaultCountry="AR"
                                    forceCallingCode={false}
                                    error={!!errors.phoneNumber}
                                    onlyCountries={['AR']}
                                    aria-labelledby="phone-label"
                                    aria-invalid={!!errors.phoneNumber}
                                    aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                                />
                            )}
                        />
                        {errors.phoneNumber?.message && (
                            <FormHelperText id="phone-error">{errors.phoneNumber.message}</FormHelperText>
                        )}
                    </FormControl>

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
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default RegisterForm;
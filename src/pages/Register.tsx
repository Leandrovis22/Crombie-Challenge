import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff' // Customize primary color
    },
    secondary: {
      main: '#6c757d' // Customize secondary color
    }
  }
});

const RegistrationForm = () => {
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
      .required('Loan amount is required')
      .min(25000, 'Loan amount must be at least $25,000')
      .max(250000, 'Loan amount must not exceed $250,000'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .min(new Date(new Date().getFullYear() - 18, 0, 1), 'You must be at least 18 years old'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/, 'Phone number must be in the format (XXX) XXX-XXXX')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    // Handle form submission
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
      >
        <Typography variant="h4" gutterBottom>
          Registration Form
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
          {...register('loanAmount')}
          label="Loan Amount"
          type="number"
          variant="outlined"
          error={!!errors.loanAmount}
          helperText={errors.loanAmount?.message}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <DatePicker
            {...register('dateOfBirth')}
            label="Date of Birth"
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
        </FormControl>

        <TextField
          {...register('phoneNumber')}
          label="Phone Number"
          variant="outlined"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationForm;
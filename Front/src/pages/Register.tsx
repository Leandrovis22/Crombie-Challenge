import { Box, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../components/FormField';
import { DateField } from '../components/DateOfBirth';
import { PhoneField } from '../components/PhoneField';
import { registerValidationSchema } from '../schemas/registerValidationSchema';
import { defaultData, RegisterFormValues } from '../types/types';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { useFormSubmission } from '../hooks/useFormSubmission';
import { FormButtons } from '../components/FormButtons';
import Alerts from '../components/Alerts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // Form state management using react-hook-form Handles validation through yup schema and maintains field states
    const { 
        control, 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset, 
        watch 
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerValidationSchema),
    });

    // Stores the current form data
    const [formData, setFormData] = useState<RegisterFormValues | null>(null);

    // Manages submission state, success/error alerts, and API communication
    const { 
        showSuccessAlert,  // Indicates successful form submission
        showErrorAlert,    // Indicates failed form submission
        errorMessage,      // Contains API or validation error messages
        submitForm        // Handles the form submission process
    } = useFormSubmission('register');

    const navigate = useNavigate();

    // Redirects to home page after successful registration
    useEffect(() => {
        if (showSuccessAlert) {
            setTimeout(() => navigate('/home'), 3000);
        }
    }, [showSuccessAlert, navigate]);

    // Automatically saves form state to localStorage and restores on mount
    useFormPersistence(reset, watch, control, setFormData);

    // Clears form state and removes persisted data
    const handleReset = () => {
        reset(defaultData);
        localStorage.setItem('formData', JSON.stringify(defaultData));
    };

    if (!formData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
              <CircularProgress />
            </Box>
          );
    }

    return (
        <Box className="form-container">

            <Box
                component="form"
                onSubmit={handleSubmit(submitForm)}
                className='form'
                aria-label="Registration Form"
                role="form"
            >
                <Typography tabIndex={0} variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800 }}>
                    Register
                </Typography>

                <FormField<RegisterFormValues>
                    register={register}
                    name="firstName"
                    label="First Name"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="lastName"
                    label="Last Name"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="email"
                    label="Email"
                    type="email"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="password"
                    label="Password"
                    type="password"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="address"
                    label="Address"
                    errors={errors}
                />
                <FormField<RegisterFormValues>
                    register={register}
                    name="loanAmount"
                    label="Loan Amount"
                    type="number"
                    min={25000}
                    max={250000}
                    errors={errors}
                />
                <DateField<RegisterFormValues>
                    control={control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    errors={errors}
                />
                <PhoneField<RegisterFormValues>
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    errors={errors}
                />

                <FormButtons onReset={handleReset} />

                <Alerts
                    showSuccessAlert={showSuccessAlert}
                    showErrorAlert={showErrorAlert}
                    errorMessage={errorMessage}
                    formData={formData}
                    alertMessage="Registration Successful"
                />
            </Box>
        </Box>
    );
};

export default Register;
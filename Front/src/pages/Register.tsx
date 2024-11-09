import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../components/FormField';
import { DateField } from '../components/DateOfBirth';
import { PhoneField } from '../components/PhoneField';
import { registerValidationSchema } from '../schemas/registerValidationSchema';
import { FormValues, defaultData } from '../types/types';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { useFormSubmission } from '../hooks/useFormSubmission';
import { FormButtons } from '../components/FormButtons';
import Alerts from '../components/Alerts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        resolver: yupResolver(registerValidationSchema),
    });

    const [formData, setFormData] = useState<FormValues | null>(null);
    const { showSuccessAlert, showErrorAlert, errorMessage, submitForm } = useFormSubmission('register');

    const navigate = useNavigate();

    useEffect(() => {
        if (showSuccessAlert) {
            setTimeout(() => navigate('/home'), 3000);
        }
    }, [showSuccessAlert, navigate]);

    useFormPersistence(reset, watch, setFormData);

    const handleReset = () => {
        reset(defaultData);
        localStorage.setItem('formData', JSON.stringify(defaultData));
    };

    if (!formData) {
        return <div></div>;
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

                <Typography variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800 }}>
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
                    name="password"
                    label="Password"
                    type="password"
                    errors={errors}
                />
                <FormField<FormValues>
                    register={register}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
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

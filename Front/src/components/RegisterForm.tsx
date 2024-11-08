import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { FormField } from '../components/FormField';
import { DateField } from '../components/DateOfBirth';
import { PhoneField } from '../components/PhoneField';
import { registerValidationSchema } from './registerValidationSchema';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Alerts from './Alerts';
import { defaultData, FormValues } from '../types/types';

const RegisterForm = () => {
    const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        resolver: yupResolver(registerValidationSchema),
    });

    const [formData, setFormData] = useState<FormValues | null>(null);
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            const parsedData = JSON.parse(storedData) as FormValues;
            setFormData(parsedData);
            reset(parsedData);
        } else {
            setFormData(defaultData);
        }
    }, [reset]);

    useEffect(() => {
        const formValues = watch();
        localStorage.setItem('formData', JSON.stringify(formValues));
        setFormData(formValues);
    }, [watch]);

    const onSubmit = async (data: FormValues) => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        const postData = {
            ...data,
            dateOfBirth: dayjs(formData?.dateOfBirth).format('YYYY-MM-DD'),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const responseData = await response.json();
            if (response.ok) {
                setShowSuccessAlert(true);
            } else {
                setErrorMessage(responseData.error);
                setShowErrorAlert(true);
            }
        } catch (error) {
            setErrorMessage('Unknown error');
            setShowErrorAlert(true);
        }

        console.log(postData);
    };

    const handleReset = () => {
        reset(defaultData);
        localStorage.setItem('formData', JSON.stringify(defaultData));
    };

    if (!formData) {
        return <div></div>;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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

            <Box className="form-button-box">

                <Button
                    onClick={handleReset}
                    variant="outlined"
                    color="secondary"
                    sx={{ width: 'calc(50% - 0.5rem)' }}
                    aria-label="Reset form"
                    role="button"
                >
                    Reset Form
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: 'calc(50% - 0.5rem)' }}
                    aria-label="Submit form"
                    role="button"
                >
                    Submit Form
                </Button>

            </Box>

            <Alerts
                showSuccessAlert={showSuccessAlert}
                showErrorAlert={showErrorAlert}
                errorMessage={errorMessage}
                formData={formData}
            />

        </Box>
    );
};

export default RegisterForm;
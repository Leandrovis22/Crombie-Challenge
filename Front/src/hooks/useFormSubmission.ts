import { useState } from 'react';
import dayjs from 'dayjs';
import { RegisterFormValues as OriginalFormValues } from '../types/types';

type RegisterFormValues = Partial<OriginalFormValues>;

export const useFormSubmission = (endpoint: string) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (data: RegisterFormValues) => {

        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        // Prepare form data, we receive it as a string, the api expects a date object
        const postData = { ...data };
        if (endpoint === 'register' && data.dateOfBirth) {
            postData.dateOfBirth = typeof data.dateOfBirth === 'string' 
                ? dayjs(data.dateOfBirth).toDate() 
                : data.dateOfBirth;
        }

        const apiUrl = process.env.REACT_APP_API_BASE_URL 
            ? `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`
            : `http://localhost:3001/${endpoint}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            const responseData = await response.json();
            
            // Handle response
            if (response.ok) {
                localStorage.setItem('token', responseData.token);
                setShowSuccessAlert(true);
            } else {
                setErrorMessage(responseData.error);
                setShowErrorAlert(true);
            }
        } catch (error) {
            setErrorMessage('Unknown error');
            setShowErrorAlert(true);
        }
    };

    return { showSuccessAlert, showErrorAlert, errorMessage, submitForm };
};
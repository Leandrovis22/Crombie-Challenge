import { useState } from 'react';
import dayjs from 'dayjs';
import { FormValues as OriginalFormValues } from '../types/types';

type FormValues = Partial<OriginalFormValues>;

export const useFormSubmission = (endpoint: string) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (data: FormValues) => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        const postData = { ...data };

        if (endpoint === 'register' && data.dateOfBirth) {
            postData.dateOfBirth = typeof data.dateOfBirth === 'string'
                ? dayjs(data.dateOfBirth).toDate()
                : data.dateOfBirth;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL ?
                    `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`
                    : `http://localhost:3001/${endpoint}`}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                }
            );

            const responseData = await response.json();
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

        console.log(postData);
    };

    return {
        showSuccessAlert,
        showErrorAlert,
        errorMessage,
        submitForm,
    };
};
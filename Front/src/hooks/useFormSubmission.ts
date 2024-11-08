import { useState } from 'react';
import dayjs from 'dayjs';
import { FormValues } from '../types/types';

export const useFormSubmission = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (data: FormValues) => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        const postData = {
            ...data,
            dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
        };

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/register`,
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
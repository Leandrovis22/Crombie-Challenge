import { useState } from 'react';
import { RegisterFormValues as OriginalFormValues } from '../types/types';

type RegisterFormValues = Partial<OriginalFormValues>;

/**
 * This handles form submission sending a post to the register or login endpoint.
 * It provides three states: showSuccessAlert, showErrorAlert, and errorMessage.
 * SubmitForm posts the form data to the endpoint.
 * If successful, it will set showSuccessAlert to true.
 * If it fails, it will set showErrorAlert to true and set errorMessage to the error message returned by the server.
 */

export const useFormSubmission = (endpoint: string) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (data: RegisterFormValues) => {

        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        const postData = {...data};

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
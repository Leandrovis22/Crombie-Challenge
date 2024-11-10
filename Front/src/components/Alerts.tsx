import { Alert } from '@mui/material';
import dayjs from 'dayjs';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    loanAmount: number;
    dateOfBirth: Date;
    phoneNumber: string;
}

interface AlertsProps {
    showSuccessAlert: boolean;
    showErrorAlert: boolean;
    errorMessage: string;
    alertMessage: string;
    formData?: FormValues;
}

/**
 * The component conditionally renders a success or error alert based on the provided props.
 * If `showSuccessAlert` is true, it displays a success alert with `alertMessage` and form data.
 * If `showErrorAlert` is true, it displays an error alert with `errorMessage`.
 */

const Alerts = ({ showSuccessAlert, showErrorAlert, errorMessage, alertMessage, formData }: AlertsProps) => {
    return (
        <>
            {showSuccessAlert && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {alertMessage} <br />
                    {formData && (
                        <>
                            First Name: {formData.firstName} <br />
                            Last Name: {formData.lastName} <br />
                            Email: {formData.email} <br />
                            Password: {formData.password} <br />
                            Address: {formData.address} <br />
                            Loan Amount: {formData.loanAmount} <br />
                            Date of Birth: {dayjs(formData.dateOfBirth).format('YYYY-MM-DD')} <br />
                            Phone Number: {formData.phoneNumber}
                        </>
                    )}
                </Alert>
            )}
            {showErrorAlert && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Alert>
            )}
        </>
    );
};

export default Alerts;


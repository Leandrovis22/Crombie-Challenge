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
    formData: FormValues;
}

const Alerts = ({ showSuccessAlert, showErrorAlert, errorMessage, formData }: AlertsProps) => {
    return (
        <>
            {showSuccessAlert && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Form submitted successfully! <br />
                    First Name: {formData.firstName} <br />
                    Last Name: {formData.lastName} <br />
                    Email: {formData.email} <br />
                    Password: {formData.password} <br />
                    Address: {formData.address} <br />
                    Loan Amount: {formData.loanAmount} <br />
                    Date of Birth: {dayjs(formData.dateOfBirth).format('YYYY-MM-DD')} <br />
                    Phone Number: {formData.phoneNumber}
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
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

interface SuccessAlertProps {
    show: boolean;
    onClose: () => void;
    formData: FormValues | null;
}

export const SuccessAlert = ({ show, onClose, formData }: SuccessAlertProps) => {
    if (!show || !formData) return null;

    return (
        <Alert
            severity="success"
            onClose={onClose}
            sx={{ position: 'absolute', top: 15, right: 15, }}
        >
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
    );
};
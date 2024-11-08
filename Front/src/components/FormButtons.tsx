import { Box, Button } from '@mui/material';

interface FormButtonsProps {
    onReset: () => void;
}

export const FormButtons = ({ onReset }: FormButtonsProps) => (
    <Box className="form-button-box">
        <Button
            onClick={onReset}
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
);
import { HomeData } from '../types/types';
import { Box, Divider, TextField } from '@mui/material';

/**
 * A component that displays a single field of user information as a label and its
 * corresponding value. The value will be displayed as a string, or as an empty
 * string if it is `undefined` or `null`. The component is entirely read-only.
 */

const UserInfoField = ({ label, value }: { label: string; value: string | number | Date | undefined | null }) => {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const displayValue = value === undefined || value === null
    ? ''
    : value instanceof Date
      ? value.toLocaleDateString()
      : value.toString();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      component="div"
      role="group"
      aria-labelledby={fieldId}
    >
      <TextField
        id={fieldId}
        label={label}
        value={displayValue}
        fullWidth
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            readOnly: true,
            sx: {
              cursor: 'text',
              userSelect: 'all',
            }
          }
        }}
        aria-label={`${label} field, value: ${displayValue}. Click to select, press Ctrl+C to copy`}
        title={`${label}: ${displayValue || 'N/A'}`}
      />
    </Box>
  );
};

/**
 * A component that displays a form with the user's information.
 */

const UserInfoForm = ({ user }: { user: HomeData | undefined | null }) => {
  if (!user) return null;

  return (
    <Box
      component="section"
      aria-label="User Information"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        paddingTop: '0.8rem',
        width: '100%',
      }}
    >
      <Divider role="presentation" />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        component="form"
        role="group"
        aria-label="User Details"
        sx={{ width: '100%' }}
      >
        <UserInfoField label="ID" value={user.id} />
        <UserInfoField label="First Name" value={user.first_name} />
        <UserInfoField label="Last Name" value={user.last_name} />
        <UserInfoField label="Email" value={user.email} />
        <UserInfoField label="Address" value={user.address} />
        <UserInfoField label="Loan Amount" value={user.loan_amount} />
        <UserInfoField label="Date of Birth" value={new Date(user.date_of_birth)} />
        <UserInfoField label="Phone Number" value={user.phone_number} />
      </Box>
    </Box>
  );
};

export default UserInfoForm;

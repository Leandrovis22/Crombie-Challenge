import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, Control, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DateFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    label: string;
    errors?: FieldErrors<TFormValues>;
}
/**
 * Renders a date picker field with a label and controlled by React Hook Form.
 * The field is rendered as a MUI DatePicker. It shows validation with the given errors object.
 * The field suggests the hardcoded min and max dates (using dayjs) so the user has at least 18 years old.
 */

export const DateField = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    errors,
}: DateFieldProps<TFormValues>) => {
    const fieldError = errors?.[name];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth margin="normal" error={!!fieldError}>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                            onChange={onChange}
                            value={value ? dayjs(value) : null}
                            label={label}
                            maxDate={dayjs().subtract(18, 'years').endOf('year')}
                            inputRef={ref}
                            slotProps={{
                                textField: {
                                    required: true,
                                    error: !!fieldError,
                                    helperText: fieldError?.message as string,
                                    'aria-label': label,
                                    'aria-required': 'true',
                                    'aria-invalid': !!fieldError,
                                    'aria-describedby': fieldError ? `${name}-error` : undefined
                                }
                            }}
                        />
                    )}
                />
            </FormControl>
        </LocalizationProvider>
    );
};
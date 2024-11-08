import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, Control, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { FormControl, FormLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DateFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    label: string;
    errors?: FieldErrors<TFormValues>;
    'aria-label'?: string;
}

export const DateField = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    errors,
    'aria-label': ariaLabel,
}: DateFieldProps<TFormValues>) => {
    const fieldError = errors?.[name];
    const finalAriaLabel = ariaLabel || label;
    const visuallyHidden = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
    };

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <FormControl fullWidth margin="normal" error={!!fieldError}>
                <FormLabel id={`${name}-label`} sx={visuallyHidden}>
                    {label}
                </FormLabel>
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
                                    'aria-label': finalAriaLabel,
                                    'aria-labelledby': `${name}-label`,
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
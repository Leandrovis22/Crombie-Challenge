import { Controller, Control, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { FormControl, FormHelperText, FormLabel } from '@mui/material';

interface PhoneFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    label: string;
    errors?: FieldErrors<TFormValues>;
    'aria-label'?: string;
}

export const PhoneField = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    errors,
    'aria-label': ariaLabel,
}: PhoneFieldProps<TFormValues>) => {
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
        <FormControl fullWidth margin="normal" error={!!fieldError}>
            <FormLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </FormLabel>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <MuiTelInput
                        value={value || ''}
                        onChange={onChange}
                        label={label}
                        defaultCountry="AR"
                        forceCallingCode={false}
                        error={!!fieldError}
                        onlyCountries={['AR']}
                        aria-label={finalAriaLabel}
                        aria-labelledby={`${name}-label`}
                        aria-invalid={!!fieldError}
                        aria-describedby={fieldError ? `${name}-error` : undefined}
                    />
                )}
            />
            {fieldError?.message && (
                <FormHelperText id={`${name}-error`}>{fieldError.message.toString()}</FormHelperText>
            )}
        </FormControl>
    );
};
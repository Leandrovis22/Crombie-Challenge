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
    

    return (
        <FormControl fullWidth margin="normal" error={!!fieldError}>
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
                        aria-required="true"
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
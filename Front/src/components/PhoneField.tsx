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

/**
 * Renders a phone input field with a country code selector using the "MuiTelInput" component
 * from the "mui-tel-input" library.
 * The field is controlled by React Hook Form and receives the following props:
 * - control: a React Hook Form controller
 * - name: the name of the field
 * - label: the label displayed on the input (Date of Birth)
 * - errors: the errors object from React Hook Form
 * The "error" prop is used to set the error state of the input and the "aria-invalid" attribute.
 * The "aria-describedby" attribute is set to the id of the helper text element if the field has an error.
 * The helper text is displayed if the field has an error and is rendered with the id of the field plus "-error".
 */

export const PhoneField = <TFormValues extends FieldValues>({
    control,
    name,
    label,
    errors,
}: PhoneFieldProps<TFormValues>) => {
    const fieldError = errors?.[name];
    
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
                        aria-label={label}
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
import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form';

interface FormFieldProps<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  type?: 'text' | 'email' | 'number' | 'password';
  errors?: FieldErrors<TFormValues>;
  min?: number;
  max?: number;
}

/**
 * This is a custom component that renders a form field with the given name and label.
 * The field is registered with React Hook Form using the given register function.
 * The field is rendered as a MUI TextField, with the type set to the given type.
 * The field is shows validation with the given errors object.
 * The field is rendered with the given min and max values if provided.
 */

export const FormField = <TFormValues extends FieldValues>({
  register,
  name,
  label,
  type = 'text',
  errors,
  min,
  max,
  ...props
}: FormFieldProps<TFormValues>) => {
  const fieldError = errors?.[name];

  return (
    <TextField
      {...register(name, type === 'number' ? { valueAsNumber: true } : undefined)}
      id={name}
      label={label}
      type={type}
      variant="outlined"
      error={!!fieldError}
      helperText={fieldError?.message as string}
      fullWidth
      margin="normal"
      aria-invalid={!!fieldError}
      aria-describedby={fieldError ? `${name}-error` : undefined}
      slotProps={{
        htmlInput: {
          'aria-label': label,
          'aria-required': 'true',
          ...(min !== undefined && { min }),
          ...(max !== undefined && { max }),
        },
      }}
      {...props}
    />
  );
};
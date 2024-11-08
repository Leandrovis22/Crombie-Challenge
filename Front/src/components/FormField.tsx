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
  'aria-label'?: string;
}

export const FormField = <TFormValues extends FieldValues>({
  register,
  name,
  label,
  type = 'text',
  errors,
  min,
  max,
  'aria-label': ariaLabel,
  ...props
}: FormFieldProps<TFormValues>) => {
  const fieldError = errors?.[name];
  const finalAriaLabel = ariaLabel || label;
  
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
        'aria-label': finalAriaLabel,
        'aria-required': 'true',
        ...(min !== undefined && { min }),
        ...(max !== undefined && { max }),
        },
      }}
      {...props}
    />
  );
};

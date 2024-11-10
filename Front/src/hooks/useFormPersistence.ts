import { useEffect } from 'react';
import { UseFormReset, UseFormWatch, Control } from 'react-hook-form';
import { RegisterFormValues, defaultData } from '../types/types';

export const useFormPersistence = (
    reset: UseFormReset<RegisterFormValues>,
    watch: UseFormWatch<RegisterFormValues>,
    control: Control<RegisterFormValues>,
    setFormData: (data: RegisterFormValues) => void
) => {
    // Restore form data from localStorage on component mount and updates the form state
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            const parsedData = JSON.parse(storedData) as RegisterFormValues;
            setFormData(parsedData);
            reset(parsedData);
        } else {
            setFormData(defaultData);
        }
    }, [reset, setFormData]);

    // Observe form changes and update localStorage
    useEffect(() => {
        const subscription = watch((formValues) => {
            if (formValues) {
                localStorage.setItem('formData', JSON.stringify(formValues));
                setFormData(formValues as RegisterFormValues);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setFormData]);
};
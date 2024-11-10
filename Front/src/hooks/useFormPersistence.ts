import { useEffect } from 'react';
import { UseFormReset, UseFormWatch } from 'react-hook-form';
import { RegisterFormValues, defaultData } from '../types/types';

export const useFormPersistence = (
    reset: UseFormReset<RegisterFormValues>,
    watch: UseFormWatch<RegisterFormValues>,
    setFormData: (data: RegisterFormValues) => void
) => {
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

    useEffect(() => {
        const formValues = watch();
        localStorage.setItem('formData', JSON.stringify(formValues));
        setFormData(formValues);
    }, [watch, setFormData]);
};
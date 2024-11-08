import { useEffect } from 'react';
import { UseFormReset, UseFormWatch } from 'react-hook-form';
import { FormValues, defaultData } from '../types/types';

export const useFormPersistence = (
    reset: UseFormReset<FormValues>,
    watch: UseFormWatch<FormValues>,
    setFormData: (data: FormValues) => void
) => {
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            const parsedData = JSON.parse(storedData) as FormValues;
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
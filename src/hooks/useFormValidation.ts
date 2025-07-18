
import { useState, useCallback } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => boolean | string;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field when it changes
    if (validationRules[field]) {
      const validationResult = validationRules[field]!(value);
      if (typeof validationResult === 'string') {
        setErrors(prev => ({ ...prev, [field]: validationResult }));
      } else if (!validationResult) {
        setErrors(prev => ({ ...prev, [field]: 'Campo inválido' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  }, [validationRules]);

  const validateAll = useCallback(() => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );
    setTouched(allTouched);

    // Check all validation rules
    for (const field in validationRules) {
      const validationResult = validationRules[field as keyof T]!(values[field as keyof T]);
      
      if (typeof validationResult === 'string') {
        newErrors[field as keyof T] = validationResult;
        isValid = false;
      } else if (!validationResult) {
        newErrors[field as keyof T] = 'Campo inválido';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    validateAll,
    reset,
    setValues
  };
}

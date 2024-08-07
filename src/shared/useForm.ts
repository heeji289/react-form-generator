import React from 'react';

interface FormProps {
  initialValues: Record<string, any>;
  validate: (values: Record<string, any>) => Record<string, string>;
  onSubmit: (values: Record<string, any>) => void;
}

export function useForm({ initialValues, validate, onSubmit }: FormProps) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => {
      if (type === 'checkbox') {
        const prevValue = prevValues[name];
        if (Array.isArray(prevValue)) {
          return {
            ...prevValues,
            [name]: checked
              ? [...prevValue, value]
              : prevValue.filter((v) => v !== value),
          };
        } else {
          return { ...prevValues, [name]: checked };
        }
      } else {
        return { ...prevValues, [name]: value };
      }
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched(
      Object.keys(values).reduce((acc: Record<string, boolean>, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    const errors = validate(values);
    setErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    onSubmit(values);
  };

  const getFieldProps = (
    name: string,
    options: { type: string; value: any }
  ) => {
    const { type = 'text', value: radioValue } = options;

    const baseProps = {
      name,
      onBlur: handleBlur,
      onChange: handleChange,
    };

    switch (type) {
      case 'checkbox':
        return {
          ...baseProps,
          type: 'checkbox',
          value: radioValue,
          checked: !!values[name],
        };
      case 'radio':
        return {
          ...baseProps,
          type: 'radio',
          value: radioValue,
          checked: values[name] === radioValue,
        };
      default:
        return {
          ...baseProps,
          type,
          value: values[name] ?? '',
        };
    }
  };

  const runValidator = React.useCallback(() => validate(values), [values]);

  React.useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
}

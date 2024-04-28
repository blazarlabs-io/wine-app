"use client";

import { useState } from "react";

export interface ValidationErrorsInterface {
  email: string | null;
  text: string | null;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrorsInterface>({
    email: "",
    text: "",
  });

  const validate = (value: string, type: string) => {
    let errors: ValidationErrorsInterface = {
      email: null,
      text: null,
    };

    // Email Errors
    if ((type = "email")) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Invalid email address";
      } else {
        errors.email = null;
      }
    }

    // Name Errors
    if (type === "text") {
      if (value.length < 3) {
        errors.text = "Name must be at least 3 characters";
      } else {
        errors.text = null;
      }
    }

    return errors;
  };

  const handleChange = (e: any, type: string) => {
    const validationErrors = validate(e.target.value, type);
    setErrors(validationErrors);
  };

  return { handleChange, errors };
};

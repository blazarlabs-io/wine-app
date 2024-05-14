"use client";

import { useCallback, useEffect, useState } from "react";

export interface ValidationErrorsInterface {
  email: string | null;
  text: string | null;
  password: string | null;
}

export const useFormValidation = () => {
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrorsInterface>({
    email: "",
    text: "",
    password: "",
  });

  const handleChange = (value: string, type: string) => {
    setType(type);
    setValue(value);
  };

  useEffect(() => {
    let errors: ValidationErrorsInterface = {
      email: null,
      text: null,
      password: null,
    };

    // Email Errors
    if (type === "email") {
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

    // Password Errors
    if (type === "password") {
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const minLength = 6;

      if (
        value.length >= minLength &&
        uppercaseRegex.test(value) &&
        numberRegex.test(value) &&
        specialCharRegex.test(value)
      ) {
        errors.password = null;
      } else {
        errors.password =
          "Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character (!>-_#?%$)";
      }
    }

    setErrors(errors);
  }, [type, value]);

  return { handleChange, errors };
};

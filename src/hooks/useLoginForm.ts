import { useState } from "react";
import { Login, loginSchema } from "@/utils/validations/AdminSchema";

interface LoginErrors {
  email?: string;
  password?: string;
}

const useLoginForm = () => {
  const defaultValues: Login = { email: "", password: "" };
  const [values, setValues] = useState<Login>(defaultValues);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setValues((input) => ({ ...input, [name]: value }));
  };

  const validateForm = () => {
    const result = loginSchema.safeParse(values);
    if (result.error) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email?.[0],
        password: errorMessages.password?.[0],
      });
      return false;
    }
    setErrors({});
    return true;
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    validateForm,
  };
};

export default useLoginForm;

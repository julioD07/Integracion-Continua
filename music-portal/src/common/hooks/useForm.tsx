
import { ChangeEvent, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSelectChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => {
    setValues(initialState);
  }

  return {
    values,
    handleInputChange,
    handleSelectChange,
    reset
  };
}

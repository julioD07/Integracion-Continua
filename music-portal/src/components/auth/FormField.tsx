interface fieldInterface {
  id: string;
  label: string;
  type: string;
}

interface FormFieldProps {
  field: fieldInterface;
  value: string;
  handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField = ({
  field,
  value,
  handleInputChange,
}: FormFieldProps) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={field.id}
        className="block text-gray-700 dark:text-gray-300 mb-2"
      >
        {field.label}
      </label>
      <input
        type={field.type}
        id={field.id}
        name={field.id}
        className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        required
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
};

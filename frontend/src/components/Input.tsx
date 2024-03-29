import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type: string;
  defaultValue?: string;
  maxLength: number;
}

export default function Input({
  handleChange,
  label,
  type,
  placeholder,
  defaultValue,
  maxLength,
}: InputProps) {
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    handleChange(event);

    if (inputValue.length > maxLength) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
  };

  return (
    <div className="relative">
      <label className="absolute left-[14px] top-[-12px] text-xm p-1 z-20 bg-white text-gray-600 ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isMaxLength ? true : false}
        defaultValue={defaultValue}
        className="h-11 rounded-3xl appearance-none relative block w-full px-4 py-2 mb-4
        bg-white placeholder-gray-600 text-gray-800 border border-gray-300
        focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm"
      />
    </div>
  );
}

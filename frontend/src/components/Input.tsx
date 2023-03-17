import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Input({ handleChange, placeholder }: InputProps) {
  return (
    <input
      onChange={handleChange}
      placeholder={placeholder}
      className="h-11 rounded-3xl appearance-none relative block w-full px-4 py-2 mb-4
        bg-white placeholder-gray-600 text-gray-800 border border-gray-300
        focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm"
    />
  );
}

import { useState } from 'react';

interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  error?: boolean;
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  id,
  error = false
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? '#D93644' : isFocused ? '#FF7031' : '#4B5563';

  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-8 py-4 border-2 rounded-sm text-lg text-gray-900 placeholder:text-gray-500 focus:outline-none resize-none"
        style={{ borderColor }}
        rows={4}
      />
    </>
  );
}
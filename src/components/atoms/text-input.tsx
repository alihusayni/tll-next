interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  type?: 'text' | 'email' | 'tel';
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
  error?: boolean;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  id,
  type = 'text',
  inputMode,
  error = false
}: TextInputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-3 border-2 rounded-sm text-lg text-gray-900 placeholder:text-gray-500 focus:outline-none"
        style={{ borderColor: error ? '#D93644' : '#4B5563' }}
      />
    </>
  );
}
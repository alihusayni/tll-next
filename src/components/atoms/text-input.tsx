interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  type?: 'text' | 'email' | 'tel';
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  id,
  type = 'text'
}: TextInputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-3 border-2 border-gray-600 rounded-sm text-lg text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
      />
    </>
  );
}
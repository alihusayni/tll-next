interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  id
}: TextAreaProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-4 border-2 border-gray-600 rounded-md text-lg text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:outline-none resize-none"
        rows={4}
      />
    </>
  );
}
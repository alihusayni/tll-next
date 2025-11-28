import {useState} from 'react';

interface TextInputProps {
    label: string;
    placeholder: string;
    value: string;
    maxLength?: number;
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
                                      maxLength,
                                      error = false
                                  }: TextInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = error ? '#D93644' : isFocused ? '#FF7031' : '#4B5563';

    return (
        <>
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
                id={id}
                type={type}
                inputMode={inputMode}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-8 py-3 border-2 rounded-sm text-lg text-gray-900 placeholder:text-gray-500
            focus:outline-none"
                style={{borderColor}}
            />
        </>
    );
}
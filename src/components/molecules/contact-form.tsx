'use client';

import { useState, FormEvent } from 'react';
import TextInput from '../atoms/text-input';
import TextArea from '../atoms/text-area';
import UiButton from '../atoms/ui-button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Since no API, just log
      console.log('Form submitted', formData);
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TextInput
        label="Full name"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange('name')}
        id="name"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <TextInput
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange('email')}
        id="email"
        type="email"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <TextInput
        label="Phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange('phone')}
        id="phone"
        type="tel"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <TextArea
        label="Message"
        placeholder="How can we help?"
        value={formData.message}
        onChange={handleChange('message')}
        id="message"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

      {/* reCAPTCHA placeholder */}
      <div className="flex items-center gap-2 p-3 border border-gray-300 rounded bg-white">
        <div className="w-6 h-6 border border-gray-400 rounded"></div>
        <span className="text-sm text-gray-700">I&apos;m not a robot</span>
        <div className="ml-auto">
          <div className="w-16 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">reCAPTCHA</div>
        </div>
      </div>

      <UiButton
        variant="outline"
        size="lg"
        type="submit"
        className="border-[#071C32]! text-[#071C32]! hover:bg-orange-500 hover:border-orange-500! hover:text-white!"
      >
        Schedule Free Consultation
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:rotate-45 transition-transform">
          <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </UiButton>
    </form>
  );
}
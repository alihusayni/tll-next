'use client';

import { useState, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import TextInput from '../atoms/text-input';
import TextArea from '../atoms/text-area';
import UiButton from '../atoms/ui-button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captcha: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    captcha: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setFormData(prev => ({ ...prev, captcha: value || '' }));
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    if (!formData.captcha.trim()) newErrors.captcha = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Since no API, just log
      console.log('Form submitted', formData);
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '', captcha: '' });
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

      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key
        onChange={handleCaptchaChange}
      />
      {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}

       <button type="submit" className="group self-start bg-transparent border-2 border-[#071C32] text-[#071C32] font-inter-tight font-semibold text-[18px] uppercase rounded-md hover:bg-[#FF7031] hover:border-[#FF7031] hover:text-white transition-all w-[23.563rem] h-[3.25rem] hover:w-[24.5rem] flex items-center justify-start gap-4 pl-6">
         Schedule Free Consultation
         <svg
             width="14"
             height="14"
             viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:rotate-45 ml-5 stroke-[#071C32] group-hover:stroke-white">
           <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
       </button>
    </form>
  );
}
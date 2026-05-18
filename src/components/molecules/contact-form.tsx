'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import TextInput from '../atoms/text-input';
import TextArea from '../atoms/text-area';

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
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormData) => (value: string) => {
    let processedValue = value;
    if (field === 'phone') {
      processedValue = value.replace(/\D/g, '');
    }
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'This field is required';
    if (!formData.email.trim()) newErrors.email = 'This field is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'This field is required';
    if (!formData.message.trim()) newErrors.message = 'This field is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Honeypot check - if honeypot field is filled, it's likely a bot
    if (honeypotRef.current?.value) {
      setErrorMessage('Invalid submission');
      return;
    }

    // Timing check - form submitted too quickly (less than 3 seconds) indicates bot
    const timeElapsed = Date.now() - formStartTime;
    if (timeElapsed < 3000) {
      setErrorMessage('Please slow down and try again');
      return;
    }

      setLoading(true);
      setErrorMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Form submission error:', text);
        setErrorMessage('Error submitting form. Please try again.');
        return;
      }

      const data = await response.json();
      if (data.message) {
        setShowSuccessPopup(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFormStartTime(Date.now());
        // Hide popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 3000);
      } else {
        setErrorMessage(data.snackbar?.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <TextInput
          label="Full name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange('name')}
          id="name"
          error={!!errors.name}
        />
        {errors.name && <p className="mt-2 text-[#D93644] font-inter-tight text-sm font-medium leading-5 capitalize">{errors.name}</p>}
      </div>

      <div>
        <TextInput
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange('email')}
          id="email"
          error={!!errors.email}
        />
        {errors.email && <p className="mt-2 text-[#D93644] font-inter-tight text-sm font-medium leading-5 capitalize">{errors.email}</p>}
      </div>

      <div>
        <TextInput
          label="Phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange('phone')}
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          error={!!errors.phone}
        />
        {errors.phone && <p className="mt-2 text-[#D93644] font-inter-tight text-sm font-medium leading-5 capitalize">{errors.phone}</p>}
      </div>

      <div>
        <TextArea
          label="Message"
          placeholder="How can we help?"
          value={formData.message}
          onChange={handleChange('message')}
          id="message"
          error={!!errors.message}
        />
        {errors.message && <p className="mt-2 text-[#D93644] font-inter-tight text-sm font-medium leading-5 capitalize">{errors.message}</p>}
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="absolute -left-[5000px] -top-[5000px] w-[0.063rem] h-[0.063rem] opacity-0 overflow-hidden"
        aria-hidden="true"
      />

      {errorMessage && (
        <p role="alert" className="text-[#D93644] font-inter-tight text-sm font-medium leading-5 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group self-start bg-transparent border-2 border-[#071C32] text-[#071C32] whitespace-nowrap font-inter-tight font-semibold text-sm sm:text-lg uppercase rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] hover:border-[#FF7031] active:border-[#FF7031] hover:text-white active:text-white transition-all w-full sm:w-[23.563rem] h-[3.25rem] hover:sm:w-[24.5rem] active:sm:w-[24.5rem] flex items-center justify-between px-6 disabled:opacity-50"
      >
        <span>{loading ? 'Submitting...' : 'Schedule Free Consultation'}</span>
          {loading ? '' :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:rotate-45 group-active:rotate-45 flex-shrink-0"
                  aria-hidden="true">
                <path d="M6 18L18 6M18 6H8M18 6V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          }

      </button>

    </form>

    {showSuccessPopup && (
      <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
        <div className="bg-[#E8EDF2] p-8 rounded-xl shadow-lg max-w-md w-full mx-4 h-auto">
          <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col">
              <h3 className="text-[2.25rem] font-bold text-[#FF7031] font-inter-tight">Thank you!</h3>
              <div className="pt-6">
                <p className="text-lg text-[#071C32] font-normal leading-relaxed">
                  We&apos;ve received your message.<br />
                  Our team will contact you soon.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-transparent border-2 border-[#071C32] text-[#071C32] font-inter-tight font-semibold text-lg uppercase rounded-md px-8 py-2 hover:bg-[#071C32] hover:text-white transition-all flex items-center justify-center gap-4"
            >
              OK, Close
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

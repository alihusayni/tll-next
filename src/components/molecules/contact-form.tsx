'use client';

import { useState, FormEvent, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import TextInput from '../atoms/text-input';
import TextArea from '../atoms/text-area';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const tolFormSettings = {
  action: 'https://contact.toporganicleads.com/api/v1/contact-form-submissions',
  method: 'POST',
  apiToken: 'f819ad31-f5ee-45ec-805a-25d3b46c6998',
  formKey: '554c2163-d430-4686-b83d-cf05bfcb88eb',
};
const tolFormRequestId = '192ebde9-db83-43a3-9578-e364df1da21c';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'This field is required';
    if (!formData.email.trim()) newErrors.email = 'This field is required';
    if (!formData.phone.trim()) newErrors.phone = 'This field is required';
    if (!formData.message.trim()) newErrors.message = 'This field is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setErrorMessage('Please complete the CAPTCHA');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(tolFormSettings.action, {
        method: tolFormSettings.method,
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': tolFormSettings.apiToken,
          'X-FORM-KEY': tolFormSettings.formKey,
          'X-REQUEST-ID': tolFormRequestId
        },
        body: JSON.stringify({ data: { ...formData, requestId: tolFormRequestId, captchaToken } })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Form submission error:', text);
        setErrorMessage('Error submitting form');
        return;
      }

      const data = await response.json();
      if (data.message) {
        setShowSuccessPopup(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        recaptchaRef.current?.reset();
        // Hide popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 100000);
      } else {
        setErrorMessage(data.snackbar?.message || 'Submission failed');
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <TextInput
          label="Full name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange('name')}
          id="name"
          error={!!errors.name}
        />
        {errors.name && <p className="mt-2 text-[#D93644] font-inter-tight text-[14px] font-medium leading-[20px] capitalize">{errors.name}</p>}
      </div>

      <div>
        <TextInput
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange('email')}
          id="email"
          type="email"
          error={!!errors.email}
        />
        {errors.email && <p className="mt-2 text-[#D93644] font-inter-tight text-[14px] font-medium leading-[20px] capitalize">{errors.email}</p>}
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
          error={!!errors.phone}
        />
        {errors.phone && <p className="mt-2 text-[#D93644] font-inter-tight text-[14px] font-medium leading-[20px] capitalize">{errors.phone}</p>}
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
        {errors.message && <p className="mt-2 text-[#D93644] font-inter-tight text-[14px] font-medium leading-[20px] capitalize">{errors.message}</p>}
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test site key
        size="invisible"
      />

      <button
        type="submit"
        disabled={loading}
        className="group self-start bg-transparent border-2 border-[#071C32] text-[#071C32] font-inter-tight font-semibold text-[18px] uppercase rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] hover:border-[#FF7031] active:border-[#FF7031] hover:text-white active:text-white transition-all w-[23.563rem] h-[3.25rem] hover:w-[24.5rem] active:w-[24.5rem] flex items-center justify-start gap-4 pl-6 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Schedule Free Consultation'}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:rotate-45 group-active:rotate-45 ml-5 stroke-[#071C32] group-hover:stroke-white group-active:stroke-white"
        >
          <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
    </form>

    {showSuccessPopup && (
      <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
        <div className="bg-[#E8EDF2] p-8 rounded-xl shadow-lg max-w-md w-full mx-4 h-auto">
          <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-[#FF7031] font-inter-tight">Thank you!</h3>
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
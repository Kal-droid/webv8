import React, { useState, useCallback } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import ConfirmationMessage from './ConfirmationMessage';
import { validateForm } from '../../utils/validation';
import { trackEvent } from '../../utils/analytics';

const initialFormState = {
  name: '',
  email: '',
  message: ''
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  }, [error]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setStatus('idle');
    setError('');
    setShowConfirmation(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus('submitting');
    
    try {
      // Simulate email sending (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setShowConfirmation(true);
      trackEvent('form_submit', { type: 'contact', success: true });

      // Hide confirmation message and reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again.');
      setStatus('error');
      trackEvent('form_submit', { type: 'contact', success: false });
    }
  }, [formData, resetForm]);

  return (
    <div className="relative">
      <ConfirmationMessage show={showConfirmation} />
      
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        animate={{ opacity: showConfirmation ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'submitting' || showConfirmation}
          autoComplete="name"
        />
        
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'submitting' || showConfirmation}
          autoComplete="email"
        />
        
        <FormTextarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'submitting' || showConfirmation}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === 'submitting' || showConfirmation}
          icon={<Send className="w-5 h-5" />}
          iconPosition="right"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
      </motion.form>
    </div>
  );
}
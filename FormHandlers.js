import { useState } from 'react';
import axios from 'axios';

/**
 * REUSABLE FRONTEND HANDLER (React Example)
 * -----------------------------------------
 * This function can be integrated into any React component.
 * It handles the loading state, data transmission, and user feedback.
 */

export const useFormHandler = (endpoint, onSuccess) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            // Using Axios (as requested) or Fetch
            const response = await axios.post(endpoint, data, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.success) {
                setSuccess(true);
                if (onSuccess) onSuccess(response.data);
                
                // Show success message (Example logic)
                alert(response.data.message || 'Form submitted successfully!');
                event.target.reset();
            } else {
                throw new Error(response.data.message || 'Submission failed.');
            }
        } catch (err) {
            console.error('Submission Error:', err);
            const errMsg = err.response?.data?.message || err.message || 'Unable to connect to server.';
            setError(errMsg);
            alert(`Error: ${errMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { handleSubmit, isSubmitting, error, success };
};

/* 
  USAGE EXAMPLE IN REACT:
  -----------------------
  import { useFormHandler } from './FormHandlers';

  const ContactForm = () => {
      const { handleSubmit, isSubmitting } = useFormHandler('/api/contact');

      return (
          <form onSubmit={handleSubmit}>
              <input name="name" required />
              <input name="email" required />
              <textarea name="message" required />
              <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
          </form>
      );
  };
*/

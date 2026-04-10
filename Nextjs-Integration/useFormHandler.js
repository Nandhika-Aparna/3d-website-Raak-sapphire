/**
 * REUSABLE FRONTEND HANDLER (React Example)
 * -----------------------------------------
 * This function can be integrated into any React component.
 * It handles the loading state, data transmission, and user feedback.
 */

import { useState } from 'react';

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
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(true);
                alert(result.message || "Form submitted successfully!");
                if (onSuccess) onSuccess(result);
                event.target.reset(); // Clear the form
            } else {
                throw new Error(result.message || "Submission failed.");
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setError(err.message || "Unable to connect to server.");
            alert(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { handleSubmit, isSubmitting, error, success };
};

/* 
  USAGE EXAMPLE IN A REACT COMPONENT:
  -----------------------------------
  import { useFormHandler } from './useFormHandler';

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

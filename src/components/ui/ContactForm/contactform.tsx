'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically make an API call to your backend
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
            setSubmitStatus('success');
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
            }
        }
    };

    const submitButtonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-accent-color mx-auto max-w-md rounded-xl p-6 shadow-lg backdrop-blur-lg'>
            <h2 className='text-foreground mb-6 text-2xl font-bold'>Get in Touch</h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <motion.input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Your Name'
                        required
                        variants={inputVariants}
                        whileFocus='focus'
                        className='bg-background border-secondary-background focus:ring-foreground w-full rounded-lg border px-4 py-2 transition-all duration-300 focus:ring-2 focus:outline-none'
                    />
                </div>

                <div>
                    <motion.input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Your Email'
                        required
                        variants={inputVariants}
                        whileFocus='focus'
                        className='bg-background border-secondary-background focus:ring-foreground w-full rounded-lg border px-4 py-2 transition-all duration-300 focus:ring-2 focus:outline-none'
                    />
                </div>

                <div>
                    <motion.textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Your Message'
                        required
                        rows={4}
                        variants={inputVariants}
                        whileFocus='focus'
                        className='bg-background border-secondary-background focus:ring-foreground w-full resize-none rounded-lg border px-4 py-2 transition-all duration-300 focus:ring-2 focus:outline-none'
                    />
                </div>

                <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    variants={submitButtonVariants}
                    initial='idle'
                    whileHover='hover'
                    whileTap='tap'
                    className={`text-background bg-foreground w-full rounded-lg py-3 font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${isSubmitting ? 'animate-pulse' : ''}`}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus === 'success' && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-4 text-center text-green-500'>
                        Message sent successfully!
                    </motion.p>
                )}

                {submitStatus === 'error' && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-4 text-center text-red-500'>
                        Failed to send message. Please try again.
                    </motion.p>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;

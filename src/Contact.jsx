import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_fixmogj';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_56iz40s';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'FfkluRZ7PlvoYX1_-';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const buildTemplateParams = () => ({
    name: formData.name,
    from_name: formData.name,
    email: formData.email,
    from_email: formData.email,
    reply_to: formData.email,
    subject: formData.subject,
    message: formData.message,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');
    setErrorMessage('');
    setIsSubmitting(true);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Email is not configured. Add your EmailJS keys.');
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        buildTemplateParams(),
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error?.text ||
          error?.message ||
          'Could not send your message. Check your EmailJS template variable names match the form.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'magnifiedsystems@gmail.com',
      link: 'mailto:magnifiedsystems@gmail.com',
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Toronto, Ontario, Canada',
      link: '#',
    },
    {
      icon: '🔗',
      title: 'LinkedIn',
      value: 'Magnified Systems',
      link: 'https://www.linkedin.com/company/magnified-systems',
    },
  ];

  return (
    <section className="contact section">
      <div className="container">
        <div className="section-header fade-in-up">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            Have any questions or want to know more about our product? Send us a message and we'll get back to you soon.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info fade-in-up">
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="contact-item"
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    <p>{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-container fade-in-up">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name: "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email: "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject: "
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message: "
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-success">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="submit-error">
                  ❌ {errorMessage || 'Oops, something went wrong. Please try again.'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

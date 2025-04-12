/**
 * @file Contact Us Component - Provides contact form and information
 * @description A responsive and accessible contact page to get in touch with CarbonHarvest.
 */

import React, { useState } from "react";
import "./ContactUs.css";
import ErrorDisplay from "../common/ErrorDisplay";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { motion } from "framer-motion";
import PageLayout from "./layouts/PageLayout";
/**
 * ContactUs Component - Displays contact form and company contact information
 * @returns {JSX.Element} Contact us page component
 */
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Please enter a valid email address');
    }
    if (!formData.subject.trim()) errors.push('Subject is required');
    if (!formData.message.trim()) errors.push('Message is required');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    setError(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setIsLoading(false);
      return; 
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you for your message! We will get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      } 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="contact-us">
      <header className="contact-header py-5" role="banner">
        <div className="container text-center">
          <h1 className="display-4 mb-3">Get in Touch</h1>
          <p className="lead">
            We are here to help you make a difference in environmental
            sustainability
          </p>
        </div>
      </header>

      <main className="container py-5">
        <div className="row g-5">
          {/* Contact Information */}
          <section className="col-lg-5" aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" className="section-heading mb-4">
              Contact Information
            </h2>

            <div className="contact-info-card p-4 rounded shadow-sm">
              <div className="contact-item mb-4">
                <h3 className="h5 mb-3">
                  <span className="contact-icon" aria-hidden="true">
                    📍
                  </span>{" "}
                  Address
                </h3>
                <address className="mb-0">
                  123 Carbon Harvest Lane
                  <br />
                  Green City, Earth 12345
                </address>
              </div>

              <div className="contact-item mb-4">
                <h3 className="h5 mb-3">
                  <span className="contact-icon" aria-hidden="true">
                    📧
                  </span>{" "}
                  Email
                </h3>
                <a
                  href="mailto:info@carbonharvest.com"
                  className="contact-link"
                >
                  info@carbonharvest.com
                </a>
              </div>

              <div className="contact-item mb-4">
                <h3 className="h5 mb-3">
                  <span className="contact-icon" aria-hidden="true">
                    📱
                  </span>{" "}
                  Phone
                </h3>
                <a href="tel:+1234567890" className="contact-link">
                  +123 456 7890
                </a>
              </div>

              <div className="social-links mt-4">
                <h3 className="h5 mb-3">Follow Us</h3>
                <div className="d-flex gap-3">
                  <a
                    href="#"
                    className="social-link"
                    aria-label="Visit our LinkedIn page"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    className="social-link"
                    aria-label="Visit our Twitter page"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="social-link"
                    aria-label="Visit our Facebook page"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="col-lg-7" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="section-heading mb-4">
              Send Us a Message
            </h2>

            {status.message && (
              <div
                className={`alert alert-${status.type === "success" ? "success" : "danger"}`}
                role="alert"
              >
                {status.message}
              </div>
            )}
            {error && <ErrorDisplay message={error} />}

            <form
              onSubmit={handleSubmit}
              className="contact-form p-4 rounded shadow-sm"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength="2"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    ></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </article>
  );
};

export default ContactUs;

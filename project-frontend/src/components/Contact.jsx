import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const navigateToPage = (path) => {
    navigate(path);
    scrollToTop();
  };

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green-50 via-light-green-100 to-light-green-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                navigateToPage('/');
              }}
            >
              <div className="bg-gradient-to-r from-light-green-500 to-light-green-600 p-2 rounded-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-light-green-500 to-light-green-600 bg-clip-text text-transparent">
                BudgetMaster
              </span>
            </Link>
            <div className="flex items-center space-x-4 w-full">
              <div className="hidden md:flex items-center space-x-6 mx-auto">
                <button 
                  onClick={() => navigateToPage('/')} 
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateToPage('/pricing')} 
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => navigateToPage('/contact')} 
                  className="px-4 py-2 text-light-green-600 font-medium border-b-2 border-light-green-600"
                >
                  Contact
                </button>
                <button 
                  onClick={() => navigateToPage('/about')} 
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
                >
                  About
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-5 py-2 border border-light-green-600 text-light-green-600 rounded-lg hover:bg-light-green-50 transition-all duration-200">Login</Link>
                <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">Signup</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white shadow rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-light-green-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Email Us</h4>
                  <p className="mt-1 text-sm text-gray-600">We typically respond within 24 hours</p>
                  <a href="mailto:support@budgetmaster.com" className="mt-2 text-light-green-600 hover:text-light-green-800 transition-colors">support@budgetmaster.com</a>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-light-green-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Call Us</h4>
                  <p className="mt-1 text-sm text-gray-600">Monday to Friday, 9am to 5pm EST</p>
                  <a href="tel:+18001234567" className="mt-2 text-light-green-600 hover:text-light-green-800 transition-colors">+1 (800) 123-4567</a>
                </div>
              </div>

              {/* Visit */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-light-green-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Visit Us</h4>
                  <p className="mt-1 text-sm text-gray-600">BudgetMaster Headquarters</p>
                  <p className="mt-1 text-sm text-gray-600">123 Finance Street</p>
                  <p className="mt-1 text-sm text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Message Sent Successfully!</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      placeholder={field === 'subject' ? "What is this about?" : field === 'email' ? "your.email@example.com" : "Your name"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-green-500 focus:border-light-green-500 sm:text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-green-500 focus:border-light-green-500 sm:text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-light-green-500 to-light-green-600 hover:from-light-green-600 hover:to-light-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-500 transition-all duration-200"
                  >
                    {submitting ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

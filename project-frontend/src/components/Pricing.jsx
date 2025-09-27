import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const navigateToPage = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green-50 via-light-green-100 to-light-green-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
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
                  className="px-4 py-2 text-light-green-600 font-medium border-b-2 border-light-green-600"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => navigateToPage('/contact')} 
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
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
                <Link to="/login" className="px-5 py-2 border border-light-green-600 text-light-green-600 rounded-lg hover:bg-light-green-50 transition-all duration-200">
                  Login
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for you and your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Basic</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="ml-2 text-base font-medium text-gray-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Perfect for getting started with budget tracking
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Track up to 3 accounts</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Basic budgeting features</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Basic expense tracking</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm">Advanced reports</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <button type="button" className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-light-green-500 to-light-green-600 hover:from-light-green-600 hover:to-light-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-500">
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg rounded-lg overflow-hidden transform scale-105 z-10">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Pro</h3>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-white text-green-700">
                  Most Popular
                </span>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$9.99</span>
                <span className="ml-2 text-base font-medium text-white">/month</span>
              </div>
              <p className="mt-2 text-sm text-white">
                Everything you need for comprehensive financial management
              </p>
              <ul className="mt-6 space-y-3">
                {/* Pro Plan Features */}
                {['Unlimited accounts', 'Advanced budgeting features', 'Detailed expense tracking and categorization', 'Advanced reports and analytics', 'Priority email and chat support'].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Get Started
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Premium</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">$19.99</span>
                <span className="ml-2 text-base font-medium text-gray-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enterprise-grade features for serious financial management
              </p>
              <ul className="mt-6 space-y-3">
                {/* Premium Plan Features */}
                {['Unlimited accounts and transactions', 'All Pro features plus advanced forecasting', 'Custom reporting and data exports', 'Multi-user access with team management', '24/7 priority phone and chat support'].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-light-green-500 to-light-green-600 hover:from-light-green-600 hover:to-light-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green-500">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900">Can I upgrade or downgrade my plan?</h4>
              <p className="mt-2 text-base text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Your subscription will be prorated based on the remaining time in your billing cycle.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Do you offer any discounts for annual plans?</h4>
              <p className="mt-2 text-base text-gray-600">
                Yes, we offer a 15% discount when you pay annually for any of our paid plans.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h4>
              <p className="mt-2 text-base text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

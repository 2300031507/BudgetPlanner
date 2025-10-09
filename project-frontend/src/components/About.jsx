import React from 'react';
import { TrendingUp, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const About = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green-50 via-light-green-100 to-light-green-200">
      {/* Navigation - Same as LandingPage but with active About link */}
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
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
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
                  className="px-4 py-2 text-light-green-600 font-medium transition-colors border-b-2 border-light-green-600"
                >
                  About
                </button>
              </div>
              <div className="flex items-center space-x-3 ml-auto">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="px-5 py-2 border border-light-green-600 text-light-green-600 rounded-lg hover:bg-light-green-50 transition-all duration-200 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user?.name || 'Dashboard'}</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2 border border-light-green-600 text-light-green-600 rounded-lg hover:bg-light-green-50 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About BudgetMaster</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help people take control of their finances and build a secure future.
            </p>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-light-green-400 to-light-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto">
                  ML
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Mario Lawrence</h4>
                <p className="text-gray-600 mb-4">Founder & CEO</p>
                <p className="text-gray-600">Finance expert with 10+ years of experience helping individuals achieve financial freedom.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-light-green-400 to-light-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto">
                  RT
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Ravi Teja</h4>
                <p className="text-gray-600 mb-4">CTO</p>
                <p className="text-gray-600">Tech enthusiast passionate about building intuitive financial tools that make a difference.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-light-green-400 to-light-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto">
                  S
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Sathwik</h4>
                <p className="text-gray-600 mb-4">Head of Product</p>
                <p className="text-gray-600">Product visionary focused on creating intuitive tools that empower financial freedom.</p>
              </div>
            </div>
          </div>

          {/* Our Impact */}
          <div className="bg-gradient-to-r from-light-green-50 to-light-green-100 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-light-green-600 mb-2">100K+</div>
                <p className="text-gray-700">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-light-green-600 mb-2">$20M+</div>
                <p className="text-gray-700">Total Savings</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-light-green-600 mb-2">98%</div>
                <p className="text-gray-700">User Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-light-green-600 mb-2">15+</div>
                <p className="text-gray-700">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="bg-gradient-to-r from-light-green-500 to-light-green-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">BudgetMaster</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BudgetMaster. All rights reserved. Made with ❤️ for your financial success.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
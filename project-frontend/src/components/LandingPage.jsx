import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  PieChart, 
  Target, 
  Shield, 
  Smartphone, 
  BarChart3,
  DollarSign,
  Users,
  Award
} from 'lucide-react';

const LandingPage = () => {
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
                <a
                  href="#features"
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
                >
                  Features
                </a>
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
                  className="px-4 py-2 text-gray-700 hover:text-light-green-600 font-medium transition-colors"
                >
                  About
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-5 py-2 border border-light-green-600 text-light-green-600 rounded-lg hover:bg-light-green-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 pl-0 pr-4 sm:pl-0 sm:pr-4 lg:pl-0 lg:pr-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-light-green-500 to-light-green-600 bg-clip-text text-transparent">
                  Master Your
                </span>
                <br />
                <span className="text-gray-800">Financial Future</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take control of your finances with our comprehensive budget planner. 
                Track expenses, set savings goals, and get intelligent insights to build wealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white rounded-full text-lg font-semibold hover:from-light-green-600 hover:to-light-green-700 transition-all transform hover:scale-105 shadow-xl text-center"
                >
                  Get Started Free
                </Link>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full text-lg font-semibold hover:border-light-green-600 hover:text-light-green-600 transition-all">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-light-green-600">10K+</div>
                <div className="text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-light-green-600">$2M+</div>
                <div className="text-gray-500">Money Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-light-green-600">4.9★</div>
                <div className="text-gray-500">User Rating</div>
              </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-light-green-100 to-light-green-200 rounded-3xl p-8 transform rotate-3 shadow-xl">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Monthly Overview</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Income</span>
                      <span className="text-green-600 font-semibold">$5,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expenses</span>
                      <span className="text-red-600 font-semibold">$3,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Savings</span>
                      <span className="text-light-green-600 font-semibold">$1,780</span>
                    </div>
                    <div className="bg-gradient-to-r from-light-green-500 to-light-green-600 h-3 rounded-full">
                      <div className="bg-white h-full w-3/4 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Complete Financial Control
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage, track, and optimize your personal finances in one beautiful platform.
            </p>
          </div>
          
          {/* Added Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="image-container shadow-lg">
              <img 
                src="/images/track.jpg" 
                alt="Expense Tracking" 
                className="feature-image w-full h-full image-position-center image-fade-in"
                style={{animationDelay: '0s'}}
              />
            </div>
            <div className="image-container shadow-lg">
              <img 
                src="/images/report.jpg" 
                alt="Financial Reports" 
                className="feature-image w-full h-full image-position-center image-fade-in"
                style={{animationDelay: '0.1s'}}
              />
            </div>
            <div className="image-container shadow-lg">
              <img 
                src="/images/goal.jpg" 
                alt="Savings Goals" 
                className="feature-image w-full h-full image-position-center image-fade-in"
                style={{animationDelay: '0.2s'}}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PieChart className="h-8 w-8" />}
              title="Expense Tracking"
              description="Categorize and track every expense with beautiful visualizations and insights."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="Savings Goals"
              description="Set and achieve your financial goals with progress tracking and smart reminders."
              gradient="from-green-500 to-teal-500"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Financial Reports"
              description="Get detailed monthly reports and analytics to understand your spending patterns."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Budget Alerts"
              description="Never overspend again with intelligent alerts and budget notifications."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={<Smartphone className="h-8 w-8" />}
              title="Mobile Ready"
              description="Access your finances anywhere with our responsive design and mobile optimization."
              gradient="from-indigo-500 to-blue-500"
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Income Management"
              description="Track multiple income sources and optimize your earning potential."
              gradient="from-emerald-500 to-green-500"
            />
          </div>
        </div>
      </section>

     {/* Trusted by Thousands Section - Positioned in the middle */}
<section className="py-20 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white">
  <div className="max-w-6xl mx-auto pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
    {/* Centered heading and subheading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
      <p className="text-xl opacity-90 max-w-2xl mx-auto">Join the community of smart savers and investors who have transformed their financial future</p>
    </div>

    {/* Statistics cards */}
    <div className="grid md:grid-cols-4 gap-8">
      <StatCard icon={<Users />} number="10,000+" label="Active Users" />
      <StatCard icon={<DollarSign />} number="$2.5M+" label="Money Managed" />
      <StatCard icon={<Award />} number="4.9/5" label="User Rating" />
      <StatCard icon={<TrendingUp />} number="35%" label="Average Savings Increase" />
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center pl-4 pr-6 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their finances with BudgetMaster.
            Start your free trial today.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Start Your Journey Today
          </Link>
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

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
    <div className={`bg-gradient-to-r ${gradient} p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform`}>
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({ icon, number, label }) => (
  <div className="text-center">
    <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
      <div className="h-8 w-8">{icon}</div>
    </div>
    <div className="text-3xl font-bold mb-2">{number}</div>
    <div className="text-lg opacity-90">{label}</div>
  </div>
);

export default LandingPage;
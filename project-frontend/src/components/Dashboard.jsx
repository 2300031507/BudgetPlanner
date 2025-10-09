import React, { useState } from 'react';
import Layout from './Layout';
import { BudgetProvider, useBudget } from '../contexts/BudgetContext';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Plus,
  X,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  return (
    <BudgetProvider>
      <Layout>
        <DashboardContent />
      </Layout>
    </BudgetProvider>
  );
};

const DashboardContent = () => {
  const {
    income,
    expenses,
    savingsGoals,
    calculateTotalExpenses,
    calculateBalance,
    addIncome,
    addExpense,
    incomeCategories,
    expenseCategories
  } = useBudget();

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddType, setQuickAddType] = useState('income'); // 'income' or 'expense'
  const [quickAddData, setQuickAddData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const totalIncome = Array.isArray(income) ? income.reduce((total, item) => total + item.amount, 0) : 0;
  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = calculateBalance();

  const budgetStatus = remainingBudget >= 0 ? 'healthy' : 'overspent';

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (quickAddData.description && quickAddData.amount && quickAddData.category) {
      const data = {
        ...quickAddData,
        amount: parseFloat(quickAddData.amount)
      };
      
      let result;
      if (quickAddType === 'income') {
        result = await addIncome(data);
        setSuccessMessage(`Income "${quickAddData.description}" of $${quickAddData.amount} added successfully!`);
      } else {
        result = await addExpense(data);
        setSuccessMessage(`Expense "${quickAddData.description}" of $${quickAddData.amount} added successfully!`);
      }
      
      if (result.success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
      
      setQuickAddData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowQuickAdd(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowQuickAdd(true)}
            className="bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Budget Alert */}
      {budgetStatus === 'overspent' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800 font-medium">
              You've exceeded your budget by ${Math.abs(remainingBudget).toFixed(2)} this month!
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          trendValue="8.2%"
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<TrendingDown className="h-6 w-6" />}
          trend="down"
          trendValue="3.1%"
          gradient="from-red-500 to-pink-600"
        />
        <StatCard
          title="Remaining Budget"
          value={`$${Math.abs(remainingBudget).toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6" />}
          trend={budgetStatus === 'healthy' ? 'up' : 'down'}
          trendValue="12.5%"
          gradient={budgetStatus === 'healthy' ? "from-blue-500 to-cyan-600" : "from-red-500 to-pink-600"}
        />
        <StatCard
          title="Savings Goals"
          value={`${savingsGoals.length} Active`}
          icon={<Target className="h-6 w-6" />}
          trend="up"
          trendValue="2 new"
          gradient="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Savings Goals Section */}
      <div className="grid lg:grid-cols-1 gap-6">
        {/* Savings Goals Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Goals Progress</h3>
          <div className="space-y-4">
            {savingsGoals.map((goal) => {
              const progress = goal.targetAmount ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
              return (
                <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-gray-900">{goal.name}</p>
                    <span className="text-sm text-gray-500">
                      ${goal.currentAmount} / ${goal.targetAmount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% complete</p>
                </div>
              );
            })}
            {savingsGoals.length === 0 && (
              <p className="text-gray-500 text-center py-8">No savings goals set</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {/* Recent Income */}
          {income.slice(-5).reverse().map((item) => (
            <div key={`income-${item.id}`} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+${item.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {/* Recent Expenses */}
          {expenses.slice(-5).reverse().map((item) => (
            <div key={`expense-${item.id}`} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">-${item.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {income.length === 0 && expenses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions yet. Use the Quick Add button to add your first income or expense!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Add</h3>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Type Selection */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setQuickAddType('income')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    quickAddType === 'income'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Income
                </button>
                <button
                  onClick={() => setQuickAddType('expense')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    quickAddType === 'expense'
                      ? 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  <TrendingDown className="h-4 w-4 inline mr-2" />
                  Expense
                </button>
              </div>
            </div>

            <form onSubmit={handleQuickAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={quickAddData.description}
                    onChange={(e) => setQuickAddData({...quickAddData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-green-500 focus:border-transparent"
                    placeholder={quickAddType === 'income' ? 'Salary, Freelance, etc.' : 'Groceries, Rent, etc.'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={quickAddData.amount}
                    onChange={(e) => setQuickAddData({...quickAddData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-green-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={quickAddData.category}
                    onChange={(e) => setQuickAddData({...quickAddData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {(quickAddType === 'income' ? incomeCategories : expenseCategories).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={quickAddData.date}
                    onChange={(e) => setQuickAddData({...quickAddData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                    quickAddType === 'income'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  }`}
                >
                  Add {quickAddType === 'income' ? 'Income' : 'Expense'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickAdd(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, trendValue, gradient }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </span>
          <span className="text-xs text-gray-500 ml-1">from last month</span>
        </div>
      </div>
      <div className={`bg-gradient-to-r ${gradient} p-3 rounded-lg`}>
        <div className="text-white">{icon}</div>
      </div>
    </div>
  </div>
);

export default Dashboard;
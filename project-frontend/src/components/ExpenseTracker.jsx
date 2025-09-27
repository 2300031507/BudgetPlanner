import React, { useState } from 'react';
import Layout from './Layout';
import { BudgetProvider, useBudget } from '../contexts/BudgetContext';
import { Plus, Edit, Trash2, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const ExpenseTracker = () => {
  return (
    <BudgetProvider>
      <Layout>
        <ExpenseTrackerContent />
      </Layout>
    </BudgetProvider>
  );
};

const ExpenseTrackerContent = () => {
  const { 
    expenses, 
    categories, 
    income,
    addExpense, 
    deleteExpense, 
    updateIncome,
    getTotalExpenses 
  } = useBudget();
  
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });
  const [newIncome, setNewIncome] = useState('');

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.category) {
      addExpense({
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      });
      setNewExpense({ description: '', amount: '', category: '' });
      setShowAddExpense(false);
    }
  };

  const handleUpdateIncome = (e) => {
    e.preventDefault();
    if (newIncome) {
      updateIncome(parseFloat(newIncome));
      setNewIncome('');
      setShowAddIncome(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowAddIncome(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            <DollarSign className="h-4 w-4 inline mr-2" />
            Set Income
          </button>
          <button
            onClick={() => setShowAddExpense(true)}
            className="bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Monthly Income</h3>
          <p className="text-3xl font-bold mt-2">${income.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Total Expenses</h3>
          <p className="text-3xl font-bold mt-2">${getTotalExpenses().toLocaleString()}</p>
        </div>
        <div className={`bg-gradient-to-r ${income - getTotalExpenses() >= 0 ? 'from-blue-500 to-cyan-600' : 'from-orange-500 to-red-500'} rounded-lg p-6 text-white`}>
          <h3 className="text-lg font-medium opacity-90">Remaining</h3>
          <p className="text-3xl font-bold mt-2">${Math.abs(income - getTotalExpenses()).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{expense.description}</h4>
                      <span className="text-xl font-semibold text-red-600">-${expense.amount}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="bg-light-green-100 text-light-green-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                        {expense.category}
                      </span>
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-light-green-600 hover:bg-light-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">No expenses found</p>
              <p className="text-gray-400 mt-2">Add your first expense to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Monthly Income</h3>
            <form onSubmit={handleUpdateIncome}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newIncome}
                  onChange={(e) => setNewIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  Save Income
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddIncome(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
            <form onSubmit={handleAddExpense}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What did you spend on?"
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
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all"
                >
                  Add Expense
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
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

export default ExpenseTracker;
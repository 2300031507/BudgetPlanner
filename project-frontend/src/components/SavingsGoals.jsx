import React, { useState } from 'react';
import Layout from './Layout';
import { BudgetProvider, useBudget } from '../contexts/BudgetContext';
import { Plus, Target, TrendingUp, Calendar, DollarSign, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const SavingsGoals = () => {
  return (
    <BudgetProvider>
      <Layout>
        <SavingsGoalsContent />
      </Layout>
    </BudgetProvider>
  );
};

const SavingsGoalsContent = () => {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal } = useBudget();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showUpdateGoal, setShowUpdateGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    description: ''
  });
  const [updateAmount, setUpdateAmount] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      addSavingsGoal({
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount)
      });
      setNewGoal({ name: '', targetAmount: '', targetDate: '', description: '' });
      setShowAddGoal(false);
    }
  };

  const handleUpdateProgress = (goalId) => {
    if (updateAmount) {
      updateSavingsGoal(goalId, parseFloat(updateAmount));
      setUpdateAmount('');
      setShowUpdateGoal(null);
    }
  };

  const getTotalSavings = () => {
    return savingsGoals.reduce((total, goal) => total + goal.currentAmount, 0);
  };

  const getTotalTargets = () => {
    return savingsGoals.reduce((total, goal) => total + goal.targetAmount, 0);
  };

  const getOverallProgress = () => {
    if (getTotalTargets() === 0) return 0;
    return (getTotalSavings() / getTotalTargets()) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
        <button
          onClick={() => setShowAddGoal(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Add Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium opacity-90">Total Saved</h3>
              <p className="text-3xl font-bold mt-2">${getTotalSavings().toLocaleString()}</p>
            </div>
            <DollarSign className="h-12 w-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium opacity-90">Target Amount</h3>
              <p className="text-3xl font-bold mt-2">${getTotalTargets().toLocaleString()}</p>
            </div>
            <Target className="h-12 w-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium opacity-90">Overall Progress</h3>
              <p className="text-3xl font-bold mt-2">{getOverallProgress().toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-12 w-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                  {goal.description && (
                    <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowUpdateGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-light-green-600 hover:bg-light-green-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteSavingsGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${goal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    of ${goal.targetAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{progress.toFixed(1)}% complete</span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 mb-2">Target Date:</div>
                <div className="text-sm font-medium text-gray-700">
                  {format(new Date(goal.targetDate), 'MMMM dd, yyyy')}
                </div>
              </div>

              <button
                onClick={() => setShowUpdateGoal(goal.id)}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Update Progress
              </button>
            </div>
          );
        })}

        {savingsGoals.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Savings Goals Yet</h3>
            <p className="text-gray-500 mb-4">Start building your financial future by setting your first savings goal.</p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Savings Goal</h3>
            <form onSubmit={handleAddGoal}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Emergency Fund, Vacation, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is this goal for?"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-light-green-500 to-light-green-600 text-white py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all"
                >
                  Create Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Progress Modal */}
      {showUpdateGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Progress</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter current amount"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleUpdateProgress(showUpdateGoal)}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Update
              </button>
              <button
                onClick={() => setShowUpdateGoal(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoals;
import React from 'react';
import Layout from './Layout';
import { BudgetProvider, useBudget } from '../contexts/BudgetContext';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  PieChart,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
    getExpensesByCategory
  } = useBudget();

  const totalIncome = Array.isArray(income) ? income.reduce((total, item) => total + item.amount, 0) : 0;
  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = calculateBalance();
  const expensesByCategory = getExpensesByCategory();

  // Chart data for expenses by category
  const expenseChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: [
        '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981',
        '#F59E0B', '#EF4444', '#F97316', '#84CC16',
        '#6B7280'
      ],
      borderWidth: 0,
    }]
  };

  // Monthly spending trend (mock data for demo)
  const monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [2400, 2100, 2800, 2300, 2700, totalExpenses || 2500],
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3B82F6',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  const budgetStatus = remainingBudget >= 0 ? 'healthy' : 'overspent';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <button className="bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all transform hover:scale-105 shadow-lg">
            <Plus className="h-4 w-4 inline mr-2" />
            Quick Add
          </button>
        </div>
      </div>

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

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          {Object.keys(expensesByCategory).length > 0 ? (
            <div className="h-64">
              <Doughnut 
                data={expenseChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }} 
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No expenses recorded yet</p>
              </div>
            </div>
          )}
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
          <div className="h-64">
            <Bar 
              data={monthlyTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions & Savings Goals */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {expenses.slice(-5).reverse().map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <span className="text-red-600 font-semibold">-${expense.amount}</span>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            )}
          </div>
        </div>

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
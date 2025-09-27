import React, { useState } from 'react';
import Layout from './Layout';
import { BudgetProvider, useBudget } from '../contexts/BudgetContext';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

const Reports = () => {
  return (
    <BudgetProvider>
      <Layout>
        <ReportsContent />
      </Layout>
    </BudgetProvider>
  );
};

const ReportsContent = () => {
  const { 
    income, 
    expenses, 
    getTotalExpenses, 
    getExpensesByCategory,
    categories 
  } = useBudget();
  
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  // Generate mock data for demonstration
  const generateMonthlyData = () => {
    const months = [];
    const incomeData = [];
    const expenseData = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push(format(date, 'MMM yyyy'));
      incomeData.push(income || Math.floor(Math.random() * 2000) + 4000);
      expenseData.push(Math.floor(Math.random() * 1500) + 2500);
    }
    
    return { months, incomeData, expenseData };
  };

  const { months, incomeData, expenseData } = generateMonthlyData();
  const expensesByCategory = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();

  // Chart configurations
  const monthlyTrendData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const categoryChartData = {
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

  const monthlyComparisonData = {
    labels: categories,
    datasets: [{
      label: 'This Month',
      data: categories.map(cat => expensesByCategory[cat] || 0),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: '#3B82F6',
      borderWidth: 1,
    }, {
      label: 'Last Month',
      data: categories.map(() => Math.floor(Math.random() * 500) + 100),
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderColor: '#8B5CF6',
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="thisYear">This Year</option>
          </select>
          <button className="bg-gradient-to-r from-light-green-500 to-light-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-light-green-600 hover:to-light-green-700 transition-all">
            <Download className="h-4 w-4 inline mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ReportCard
          title="Total Income"
          value={`$${income.toLocaleString()}`}
          change="+8.2%"
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />
        <ReportCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          change="-3.1%"
          trend="down"
          icon={<TrendingDown className="h-6 w-6" />}
          color="red"
        />
        <ReportCard
          title="Net Savings"
          value={`$${(income - totalExpenses).toLocaleString()}`}
          change="+15.4%"
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
          color="blue"
        />
        <ReportCard
          title="Savings Rate"
          value={`${income > 0 ? (((income - totalExpenses) / income) * 100).toFixed(1) : 0}%`}
          change="+2.3%"
          trend="up"
          icon={<FileText className="h-6 w-6" />}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses Trend</h3>
          <div className="h-64">
            <Line data={monthlyTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="h-64">
            {Object.keys(expensesByCategory).length > 0 ? (
              <Doughnut data={categoryChartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No expense data available
              </div>
            )}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Comparison</h3>
          <div className="h-64">
            <Bar data={monthlyComparisonData} options={chartOptions} />
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">85</span>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-900">Excellent</p>
            <p className="text-gray-600 mt-2">
              Your financial health is strong. Keep up the good work with your budgeting and savings!
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Budget Adherence</span>
                <span className="text-green-600 font-medium">90%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Savings Rate</span>
                <span className="text-green-600 font-medium">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Emergency Fund</span>
                <span className="text-yellow-600 font-medium">80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expenses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {months.map((month, index) => {
                const monthIncome = incomeData[index];
                const monthExpenses = expenseData[index];
                const monthSavings = monthIncome - monthExpenses;
                const savingsRate = (monthSavings / monthIncome) * 100;
                
                return (
                  <tr key={month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      ${monthIncome.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      ${monthExpenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-green-600 font-medium">
                      ${monthSavings.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${savingsRate > 20 ? 'text-green-600' : savingsRate > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {savingsRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, value, change, trend, icon, color }) => {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-indigo-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↗' : '↘'} {change}
            </span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-3 rounded-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
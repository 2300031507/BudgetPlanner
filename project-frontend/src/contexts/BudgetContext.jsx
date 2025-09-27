import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BudgetContext = createContext();
const API_URL = 'http://localhost:8081/api/budget'; // Backend API base URL

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export const BudgetProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Categories for expenses and income
  const expenseCategories = [
    'Housing', 'Food', 'Transportation', 'Utilities', 'Insurance',
    'Healthcare', 'Entertainment', 'Education', 'Shopping', 'Other'
  ];

  const incomeCategories = [
    'Salary', 'Freelance', 'Investments', 'Gifts', 'Other'
  ];

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all budget data from backend
  const fetchBudgetData = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      // Fetch income
      const incomeResponse = await fetch(`${API_URL}/income`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const incomeData = await incomeResponse.json();
      
      // Fetch expenses
      const expensesResponse = await fetch(`${API_URL}/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const expensesData = await expensesResponse.json();
      
      // Fetch savings goals
      const savingsResponse = await fetch(`${API_URL}/savings-goals`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const savingsData = await savingsResponse.json();
      
      setIncome(incomeData);
      setExpenses(expensesData);
      setSavingsGoals(savingsData);
    } catch (error) {
      console.error('Error fetching budget data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, [user]);

  // Calculate total income
  const calculateTotalIncome = () => {
    return income.reduce((total, item) => total + item.amount, 0);
  };

  // Calculate total expenses
  const calculateTotalExpenses = () => {
    return expenses.reduce((total, item) => total + item.amount, 0);
  };

  // Calculate remaining balance
  const calculateBalance = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  // Add income
  const addIncome = async (incomeItem) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/income`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...incomeItem, userId: user.id })
      });
      const newIncome = await response.json();
      setIncome([...income, newIncome]);
      return { success: true, data: newIncome };
    } catch (error) {
      console.error('Error adding income:', error);
      return { success: false, error: error.message };
    }
  };

  // Add expense
  const addExpense = async (expenseItem) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...expenseItem, userId: user.id })
      });
      const newExpense = await response.json();
      setExpenses([...expenses, newExpense]);
      return { success: true, data: newExpense };
    } catch (error) {
      console.error('Error adding expense:', error);
      return { success: false, error: error.message };
    }
  };

  // Update income
  const updateIncome = async (id, updatedIncome) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/income/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedIncome)
      });
      const updatedData = await response.json();
      setIncome(income.map(item => 
        item.id === id ? updatedData : item
      ));
      return { success: true, data: updatedData };
    } catch (error) {
      console.error('Error updating income:', error);
      return { success: false, error: error.message };
    }
  };

  // Update expense
  const updateExpense = async (id, updatedExpense) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExpense)
      });
      const updatedData = await response.json();
      setExpenses(expenses.map(item => 
        item.id === id ? updatedData : item
      ));
      return { success: true, data: updatedData };
    } catch (error) {
      console.error('Error updating expense:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/income/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setIncome(income.filter(item => item.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting income:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setExpenses(expenses.filter(item => item.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting expense:', error);
      return { success: false, error: error.message };
    }
  };

  // Add savings goal
  const addSavingsGoal = async (goal) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/savings-goals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...goal, userId: user.id, currentAmount: 0 })
      });
      const newGoal = await response.json();
      setSavingsGoals([...savingsGoals, newGoal]);
      return { success: true, data: newGoal };
    } catch (error) {
      console.error('Error adding savings goal:', error);
      return { success: false, error: error.message };
    }
  };

  // Update savings goal
  const updateSavingsGoal = async (id, updatedGoal) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/savings-goals/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGoal)
      });
      const updatedData = await response.json();
      setSavingsGoals(savingsGoals.map(item => 
        item.id === id ? updatedData : item
      ));
      return { success: true, data: updatedData };
    } catch (error) {
      console.error('Error updating savings goal:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete savings goal
  const deleteSavingsGoal = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/savings-goals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSavingsGoals(savingsGoals.filter(item => item.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting savings goal:', error);
      return { success: false, error: error.message };
    }
  };

  // Update progress on a savings goal
  const updateSavingsProgress = async (id, amount) => {
    try {
      const goal = savingsGoals.find(g => g.id === id);
      if (!goal) throw new Error('Goal not found');
      
      const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/savings-goals/${id}/progress`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentAmount: newAmount })
      });
      const updatedData = await response.json();
      
      setSavingsGoals(savingsGoals.map(item => 
        item.id === id ? updatedData : item
      ));
      return { success: true, data: updatedData };
    } catch (error) {
      console.error('Error updating savings progress:', error);
      return { success: false, error: error.message };
    }
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  const value = {
    // Data
    income,
    expenses,
    savingsGoals,
    expenseCategories,
    incomeCategories,
    loading,
    
    // Calculations
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateBalance,
    getExpensesByCategory,
    
    // Actions
    addIncome,
    addExpense,
    updateIncome,
    updateExpense,
    deleteIncome,
    deleteExpense,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    updateSavingsProgress,
    fetchBudgetData
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
package com.projectpurple.backend.controller;

import com.projectpurple.backend.model.Expense;
import com.projectpurple.backend.model.Income;
import com.projectpurple.backend.model.SavingsGoal;
import com.projectpurple.backend.model.User;
import com.projectpurple.backend.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    // Expense endpoints
    @PostMapping("/expenses")
    public ResponseEntity<?> addExpense(@RequestBody Expense expense, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Expense savedExpense = budgetService.addExpense(expense, user);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    @GetMapping("/expenses")
    public ResponseEntity<?> getExpenses(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Expense> expenses = budgetService.getExpensesByUser(user);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/expenses/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Expense> expense = budgetService.getExpenseById(id);
        
        if (expense.isPresent() && expense.get().getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(expense.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Expense not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Expense> expenseOptional = budgetService.getExpenseById(id);
        
        if (expenseOptional.isPresent() && expenseOptional.get().getUser().getId().equals(user.getId())) {
            Expense expense = expenseOptional.get();
            expense.setAmount(updatedExpense.getAmount());
            expense.setCategory(updatedExpense.getCategory());
            expense.setDescription(updatedExpense.getDescription());
            
            Expense savedExpense = budgetService.updateExpense(expense);
            return new ResponseEntity<>(savedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Expense not found"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Expense> expenseOptional = budgetService.getExpenseById(id);
        
        if (expenseOptional.isPresent() && expenseOptional.get().getUser().getId().equals(user.getId())) {
            budgetService.deleteExpense(id);
            return new ResponseEntity<>(Map.of("message", "Expense deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Expense not found"), HttpStatus.NOT_FOUND);
        }
    }

    // Income endpoints
    @PostMapping("/income")
    public ResponseEntity<?> addIncome(@RequestBody Income income, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Income savedIncome = budgetService.addIncome(income, user);
        return new ResponseEntity<>(savedIncome, HttpStatus.CREATED);
    }

    @GetMapping("/income")
    public ResponseEntity<?> getIncome(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Income> income = budgetService.getIncomeByUser(user);
        return new ResponseEntity<>(income, HttpStatus.OK);
    }

    @GetMapping("/income/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Income> income = budgetService.getIncomeById(id);
        
        if (income.isPresent() && income.get().getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(income.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Income not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/income/{id}")
    public ResponseEntity<?> updateIncome(@PathVariable Long id, @RequestBody Income updatedIncome, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Income> incomeOptional = budgetService.getIncomeById(id);
        
        if (incomeOptional.isPresent() && incomeOptional.get().getUser().getId().equals(user.getId())) {
            Income income = incomeOptional.get();
            income.setAmount(updatedIncome.getAmount());
            income.setCategory(updatedIncome.getCategory());
            income.setDescription(updatedIncome.getDescription());
            
            Income savedIncome = budgetService.updateIncome(income);
            return new ResponseEntity<>(savedIncome, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Income not found"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/income/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Income> incomeOptional = budgetService.getIncomeById(id);
        
        if (incomeOptional.isPresent() && incomeOptional.get().getUser().getId().equals(user.getId())) {
            budgetService.deleteIncome(id);
            return new ResponseEntity<>(Map.of("message", "Income deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Income not found"), HttpStatus.NOT_FOUND);
        }
    }

    // Savings Goal endpoints
    @PostMapping("/savings-goals")
    public ResponseEntity<?> addSavingsGoal(@RequestBody SavingsGoal goal, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        SavingsGoal savedGoal = budgetService.addSavingsGoal(goal, user);
        return new ResponseEntity<>(savedGoal, HttpStatus.CREATED);
    }

    @GetMapping("/savings-goals")
    public ResponseEntity<?> getSavingsGoals(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<SavingsGoal> goals = budgetService.getSavingsGoalsByUser(user);
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }

    @GetMapping("/savings-goals/{id}")
    public ResponseEntity<?> getSavingsGoalById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<SavingsGoal> goal = budgetService.getSavingsGoalById(id);
        
        if (goal.isPresent() && goal.get().getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(goal.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Savings goal not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/savings-goals/{id}")
    public ResponseEntity<?> updateSavingsGoal(@PathVariable Long id, @RequestBody SavingsGoal updatedGoal, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<SavingsGoal> goalOptional = budgetService.getSavingsGoalById(id);
        
        if (goalOptional.isPresent() && goalOptional.get().getUser().getId().equals(user.getId())) {
            SavingsGoal goal = goalOptional.get();
            goal.setName(updatedGoal.getName());
            goal.setTargetAmount(updatedGoal.getTargetAmount());
            goal.setCurrentAmount(updatedGoal.getCurrentAmount());
            goal.setDescription(updatedGoal.getDescription());
            
            SavingsGoal savedGoal = budgetService.updateSavingsGoal(goal);
            return new ResponseEntity<>(savedGoal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Savings goal not found"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/savings-goals/{id}")
    public ResponseEntity<?> deleteSavingsGoal(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<SavingsGoal> goalOptional = budgetService.getSavingsGoalById(id);
        
        if (goalOptional.isPresent() && goalOptional.get().getUser().getId().equals(user.getId())) {
            budgetService.deleteSavingsGoal(id);
            return new ResponseEntity<>(Map.of("message", "Savings goal deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("error", "Savings goal not found"), HttpStatus.NOT_FOUND);
        }
    }

    // Budget summary endpoints
    @GetMapping("/summary")
    public ResponseEntity<?> getBudgetSummary(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Double totalExpenses = budgetService.getTotalExpenses(user);
        Double totalSavings = budgetService.getTotalSavingsProgress(user);
        Map<String, Double> expensesByCategory = budgetService.getExpensesByCategory(user);
        
        Map<String, Object> summary = Map.of(
                "totalExpenses", totalExpenses,
                "totalSavings", totalSavings,
                "expensesByCategory", expensesByCategory
        );
        
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getExpenseCategories() {
        String[] categories = {
            "Food & Dining", "Transportation", "Shopping", "Entertainment",
            "Bills & Utilities", "Healthcare", "Travel", "Education", "Other"
        };
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
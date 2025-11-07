package com.example.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Budget;
import com.example.backend.model.Category;


public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(UUID userId);
    List<Budget> findByUserIdAndMonth(UUID userId, String month);
    List<Budget> findByUserIdAndCategory(UUID userId, Category category);
    List<Budget> findByUserIdAndMonthAndCategory(UUID userId, String month, Category category);

}


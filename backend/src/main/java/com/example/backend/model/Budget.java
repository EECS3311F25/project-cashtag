package com.example.backend.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "budgets")
public class Budget {
    // unique ID per budget, not sure if needed
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // unique ID per budget, not sure if needed

    // store the string representation of expense category
    @Enumerated(EnumType.STRING)
    private Category category;

    // month for which this budget applies, format: YYYY-MM
    private String month;

    // maximum amount allowed in this budget 
    private double max_amount;

    // amount spent so far in this budget 
    private double current_amount; 

    // store userId directly
    private UUID userId; 

    public Budget() {}

    public Budget(double max_amount, double current_amount, Category category, UUID userId, String month) {
        this.max_amount = max_amount;
        this.current_amount = current_amount;
        this.category = category;
        this.userId = userId;
        // set budget period to current month (YYYY-MM)
        this.month = month;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setMaxAmount(double max_amount) {
        this.max_amount = max_amount;
    }

    public double getMaxAmount() {
        return max_amount;
    }

    public void setCurrentAmount(double current_amount) {
        this.current_amount = current_amount;
    }

    public double getCurrentAmount() {
        return current_amount;
    }

    public String getMonth() {
        return month;
    }
}

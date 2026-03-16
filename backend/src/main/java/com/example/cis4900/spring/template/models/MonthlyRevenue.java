package com.example.cis4900.spring.template.models;

import java.math.BigDecimal;

public class MonthlyRevenue {

    private String month;
    private BigDecimal revenue;

    public MonthlyRevenue(String month, BigDecimal revenue) {
        this.month = month;
        this.revenue = revenue;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
}
package com.example.cis4900.spring.template.models;

import java.math.BigDecimal;

public class WeeklyRevenue {

    private String week;
    private BigDecimal revenue;

    public WeeklyRevenue(String week, BigDecimal revenue) {
        this.week = week;
        this.revenue = revenue;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
}

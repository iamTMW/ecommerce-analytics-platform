package com.example.cis4900.spring.template.models;

import java.math.BigDecimal;

public class CustomerRevenue {

    private String customerId;
    private BigDecimal revenue;

    public CustomerRevenue(String customerId, BigDecimal revenue) {
        this.customerId = customerId;
        this.revenue = revenue;
    }

    public String getCustomerId() {
        return customerId;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }
}
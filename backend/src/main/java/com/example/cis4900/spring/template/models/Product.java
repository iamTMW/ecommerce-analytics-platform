package com.example.cis4900.spring.template.models;

import java.math.BigDecimal;

public class Product {

    private String stockCode;
    private String description;
    private BigDecimal revenue;

    public Product(String stockCode, String description, BigDecimal revenue) {
        this.stockCode = stockCode;
        this.description = description;
        this.revenue = revenue;
    }

    public String getStockCode() {
        return stockCode;
    }

    public void setStockCode(String stockCode) {
        this.stockCode = stockCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
}

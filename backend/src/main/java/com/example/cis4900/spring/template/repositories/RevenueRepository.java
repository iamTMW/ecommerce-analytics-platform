package com.example.cis4900.spring.template.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.cis4900.spring.template.models.MonthlyRevenue;

@Repository
public class RevenueRepository {

    private final JdbcTemplate jdbcTemplate;

    public RevenueRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<MonthlyRevenue> getMonthlyRevenue() {
        String sql = "SELECT "
                + "DATE_FORMAT(invoice_date, '%Y-%m') AS month, "
                + "SUM(quantity * unit_price) AS revenue "
                + "FROM retail_transactions "
                + "WHERE quantity > 0 AND unit_price > 0 "
                + "GROUP BY YEAR(invoice_date), MONTH(invoice_date) "
                + "ORDER BY YEAR(invoice_date) ASC, MONTH(invoice_date) ASC";

        return jdbcTemplate.query(sql, (rs, rowNum) -> new MonthlyRevenue(
                rs.getString("month"),
                rs.getBigDecimal("revenue")
        ));
    }
}

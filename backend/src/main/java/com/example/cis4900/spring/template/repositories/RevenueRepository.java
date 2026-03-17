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

    public List<MonthlyRevenue> findMonthlyRevenue() {

        String sql = """
            SELECT DATE_FORMAT(invoice_date, '%b') AS month,
                   SUM(quantity * unit_price) AS revenue
            FROM retail_transactions
            WHERE invoice_no NOT LIKE 'C%'
            GROUP BY MONTH(invoice_date), DATE_FORMAT(invoice_date, '%b')
            ORDER BY MONTH(invoice_date)
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new MonthlyRevenue(
                rs.getString("month"),
                rs.getBigDecimal("revenue")
        ));
    }
}
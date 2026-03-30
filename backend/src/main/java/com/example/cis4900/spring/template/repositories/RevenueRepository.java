package com.example.cis4900.spring.template.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.cis4900.spring.template.models.MonthlyRevenue;
import com.example.cis4900.spring.template.models.WeeklyRevenue;
import com.example.cis4900.spring.template.models.CustomerRevenue;

@Repository
public class RevenueRepository {

    private final JdbcTemplate jdbcTemplate;

    public RevenueRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<MonthlyRevenue> findMonthlyRevenue() {
        String sql = """
            SELECT DATE_FORMAT(invoice_date, '%Y-%m') AS month,
                SUM(quantity * unit_price) AS revenue
            FROM retail_transactions
            WHERE invoice_no NOT LIKE 'C%'
            AND quantity > 0
            AND unit_price > 0
            GROUP BY YEAR(invoice_date), MONTH(invoice_date)
            ORDER BY YEAR(invoice_date) ASC, MONTH(invoice_date) ASC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new MonthlyRevenue(
                rs.getString("month"),
                rs.getBigDecimal("revenue")
        ));
    }

    public List<WeeklyRevenue> findWeeklyRevenue() {
        String sql = """
            SELECT CONCAT(
                    FLOOR(YEARWEEK(invoice_date, 3) / 100),
                    '-W',
                    LPAD(MOD(YEARWEEK(invoice_date, 3), 100), 2, '0')
                ) AS week,
                SUM(quantity * unit_price) AS revenue
            FROM retail_transactions
            WHERE invoice_no NOT LIKE 'C%'
            AND quantity > 0
            AND unit_price > 0
            GROUP BY YEARWEEK(invoice_date, 3)
            ORDER BY YEARWEEK(invoice_date, 3) ASC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new WeeklyRevenue(
                rs.getString("week"),
                rs.getBigDecimal("revenue")
        ));
    }

    public List<CustomerRevenue> findTopCustomers() {
    String sql = """
        SELECT customer_id,
               SUM(quantity * unit_price) AS revenue
        FROM retail_transactions
        WHERE invoice_no NOT LIKE 'C%'
          AND quantity > 0
          AND unit_price > 0
          AND customer_id IS NOT NULL
        GROUP BY customer_id
        ORDER BY revenue DESC
        LIMIT 10
    """;

    return jdbcTemplate.query(sql, (rs, rowNum) -> 
        new CustomerRevenue(
            rs.getString("customer_id"),
            rs.getBigDecimal("revenue")
        )
    );
}
}


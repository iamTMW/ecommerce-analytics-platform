package com.example.cis4900.spring.template.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.cis4900.spring.template.models.Product;

@Repository
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findTop10ProductsByRevenue() {
        String sql = "SELECT stock_code, description, SUM(quantity * unit_price) AS revenue "
                + "FROM retail_transactions "
                + "WHERE invoice_no NOT LIKE 'C%' "
                + "GROUP BY stock_code, description "
                + "ORDER BY revenue DESC "
                + "LIMIT 10";

        return jdbcTemplate.query(sql, (rs, rowNum) -> new Product(
                rs.getString("stock_code"),
                rs.getString("description"),
                rs.getBigDecimal("revenue")
        ));
    }
}

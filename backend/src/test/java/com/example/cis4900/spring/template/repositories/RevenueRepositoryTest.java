package com.example.cis4900.spring.template.repositories;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.example.cis4900.spring.template.models.MonthlyRevenue;
import com.example.cis4900.spring.template.models.WeeklyRevenue;

class RevenueRepositoryTest {

    @Test
    void findMonthlyRevenue_usesExpectedSql_andMapsRowToMonthlyRevenue() throws SQLException {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RevenueRepository repository = new RevenueRepository(jdbcTemplate);

        ArgumentCaptor<String> sqlCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<RowMapper<MonthlyRevenue>> mapperCaptor =
                ArgumentCaptor.forClass(RowMapper.class);

        when(jdbcTemplate.query(anyString(), any(RowMapper.class)))
                .thenReturn(List.of());

        repository.findMonthlyRevenue();

        verify(jdbcTemplate).query(sqlCaptor.capture(), mapperCaptor.capture());
        String sql = sqlCaptor.getValue();
        assertThat(sql).contains("SELECT DATE_FORMAT(invoice_date, '%Y-%m') AS month");
        assertThat(sql).contains("SUM(quantity * unit_price) AS revenue");
        assertThat(sql).contains("FROM retail_transactions");
        assertThat(sql).contains("WHERE invoice_no NOT LIKE 'C%'");
        assertThat(sql).contains("AND quantity > 0");
        assertThat(sql).contains("AND unit_price > 0");
        assertThat(sql).contains("GROUP BY YEAR(invoice_date), MONTH(invoice_date)");
        assertThat(sql).contains("ORDER BY YEAR(invoice_date) ASC, MONTH(invoice_date) ASC");

        RowMapper<MonthlyRevenue> mapper = mapperCaptor.getValue();
        ResultSet rs = mock(ResultSet.class);
        when(rs.getString("month")).thenReturn("2024-01");
        when(rs.getBigDecimal("revenue")).thenReturn(new BigDecimal("123.45"));

        MonthlyRevenue mapped = mapper.mapRow(rs, 0);

        assertThat(mapped.getMonth()).isEqualTo("2024-01");
        assertThat(mapped.getRevenue()).isEqualByComparingTo("123.45");
    }

    @Test
    void findMonthlyRevenue_returnsEmptyListWhenNoRows() {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RevenueRepository repository = new RevenueRepository(jdbcTemplate);

        when(jdbcTemplate.query(anyString(), any(RowMapper.class)))
                .thenReturn(List.of());

        var result = repository.findMonthlyRevenue();

        assertThat(result).isEmpty();
    }

    @Test
    void rowMapper_mapsMultipleRowsIndependently() throws SQLException {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RevenueRepository repository = new RevenueRepository(jdbcTemplate);

        ArgumentCaptor<RowMapper<MonthlyRevenue>> mapperCaptor =
                ArgumentCaptor.forClass(RowMapper.class);

        when(jdbcTemplate.query(anyString(), any(RowMapper.class)))
                .thenReturn(List.of());

        repository.findMonthlyRevenue();

        verify(jdbcTemplate).query(anyString(), mapperCaptor.capture());
        RowMapper<MonthlyRevenue> mapper = mapperCaptor.getValue();

        ResultSet firstRow = mock(ResultSet.class);
        when(firstRow.getString("month")).thenReturn("2024-01");
        when(firstRow.getBigDecimal("revenue")).thenReturn(new BigDecimal("10.00"));

        ResultSet secondRow = mock(ResultSet.class);
        when(secondRow.getString("month")).thenReturn("2024-02");
        when(secondRow.getBigDecimal("revenue")).thenReturn(new BigDecimal("20.00"));

        MonthlyRevenue first = mapper.mapRow(firstRow, 0);
        MonthlyRevenue second = mapper.mapRow(secondRow, 1);

        assertThat(first.getMonth()).isEqualTo("2024-01");
        assertThat(first.getRevenue()).isEqualByComparingTo("10.00");
        assertThat(second.getMonth()).isEqualTo("2024-02");
        assertThat(second.getRevenue()).isEqualByComparingTo("20.00");
    }

    @Test
    void findWeeklyRevenue_usesExpectedSql_andMapsRowToWeeklyRevenue() throws SQLException {
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        RevenueRepository repository = new RevenueRepository(jdbcTemplate);

        ArgumentCaptor<String> sqlCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<RowMapper<WeeklyRevenue>> mapperCaptor =
                ArgumentCaptor.forClass(RowMapper.class);

        when(jdbcTemplate.query(anyString(), any(RowMapper.class)))
                .thenReturn(List.of());

        repository.findWeeklyRevenue();

        verify(jdbcTemplate).query(sqlCaptor.capture(), mapperCaptor.capture());
        String sql = sqlCaptor.getValue();
        assertThat(sql).contains("YEARWEEK(invoice_date, 3)");
        assertThat(sql).contains("AS week");
        assertThat(sql).contains("SUM(quantity * unit_price) AS revenue");
        assertThat(sql).contains("FROM retail_transactions");
        assertThat(sql).contains("WHERE invoice_no NOT LIKE 'C%'");
        assertThat(sql).contains("GROUP BY YEARWEEK(invoice_date, 3)");
        assertThat(sql).contains("ORDER BY YEARWEEK(invoice_date, 3) ASC");

        RowMapper<WeeklyRevenue> mapper = mapperCaptor.getValue();
        ResultSet rs = mock(ResultSet.class);
        when(rs.getString("week")).thenReturn("2024-W01");
        when(rs.getBigDecimal("revenue")).thenReturn(new BigDecimal("99.99"));

        WeeklyRevenue mapped = mapper.mapRow(rs, 0);

        assertThat(mapped.getWeek()).isEqualTo("2024-W01");
        assertThat(mapped.getRevenue()).isEqualByComparingTo("99.99");
    }
}

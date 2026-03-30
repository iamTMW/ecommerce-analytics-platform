package com.example.cis4900.spring.template.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.cis4900.spring.template.models.MonthlyRevenue;
import com.example.cis4900.spring.template.repositories.RevenueRepository;

@WebMvcTest(RevenueController.class)
class RevenueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RevenueRepository revenueRepository;

    @Test
    void getMonthlyRevenue_returnsMonthlyRevenueList() throws Exception {
        List<MonthlyRevenue> revenues = List.of(
                new MonthlyRevenue("2024-01", new BigDecimal("123.45")),
                new MonthlyRevenue("2024-02", new BigDecimal("234.56")));

        when(revenueRepository.findMonthlyRevenue(null, null)).thenReturn(revenues);

        mockMvc.perform(get("/api/revenue/monthly"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].month").value("2024-01"))
                .andExpect(jsonPath("$[0].revenue").value(123.45))
                .andExpect(jsonPath("$[1].month").value("2024-02"))
                .andExpect(jsonPath("$[1].revenue").value(234.56));
    }
}


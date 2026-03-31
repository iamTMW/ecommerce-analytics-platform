package com.example.cis4900.spring.template.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cis4900.spring.template.models.MonthlyRevenue;
import com.example.cis4900.spring.template.models.WeeklyRevenue;
import com.example.cis4900.spring.template.repositories.RevenueRepository;
import com.example.cis4900.spring.template.models.CustomerRevenue;

@RestController
public class RevenueController {

    private final RevenueRepository revenueRepository;

    public RevenueController(RevenueRepository revenueRepository) {
        this.revenueRepository = revenueRepository;
    }

    @GetMapping("/api/revenue/monthly")
    public List<MonthlyRevenue> getMonthlyRevenue(
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate) {
        return revenueRepository.findMonthlyRevenue(startDate, endDate);
    }

    @GetMapping("/api/revenue/weekly")
    public List<WeeklyRevenue> getWeeklyRevenue(
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate) {
        return revenueRepository.findWeeklyRevenue(startDate, endDate);
    }

    @GetMapping("/api/customers/top")
    public List<CustomerRevenue> getTopCustomers() {
        return revenueRepository.findTopCustomers();
    }
}

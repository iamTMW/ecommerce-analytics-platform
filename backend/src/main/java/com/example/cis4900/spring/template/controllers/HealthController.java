package com.example.cis4900.spring.template.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/health")
public class HealthController {

    @GetMapping()
    public String health() {
        return "Backend is running";
    }
}
package com.example.cis4900.spring.template.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cis4900.spring.template.models.Product;
import com.example.cis4900.spring.template.repositories.ProductRepository;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/top10")
    public List<Product> getTop10ProductsByRevenue() {
        return productRepository.findTop10ProductsByRevenue();
    }
}

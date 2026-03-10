CREATE DATABASE IF NOT EXISTS template_db;
USE template_db;

CREATE TABLE IF NOT EXISTS health_check (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS retail_transactions;

CREATE TABLE retail_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    invoice_no VARCHAR(10) NOT NULL,
    stock_code VARCHAR(20) NOT NULL,
    description VARCHAR(255) NULL,
    quantity INT NOT NULL,
    invoice_date DATETIME NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    customer_id VARCHAR(10) NULL,
    country VARCHAR(100) NOT NULL,

    INDEX idx_invoice_no (invoice_no),
    INDEX idx_stock_code (stock_code),
    INDEX idx_customer_id (customer_id),
    INDEX idx_invoice_date (invoice_date),
    INDEX idx_country (country)
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/online_retail_II.csv'
INTO TABLE retail_transactions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@invoice_no, @stock_code, @description, @quantity, @invoice_date, @unit_price, @customer_id, @country)
SET
    invoice_no   = NULLIF(TRIM(@invoice_no), ''),
    stock_code   = NULLIF(TRIM(@stock_code), ''),
    description  = NULLIF(TRIM(@description), ''),
    quantity     = NULLIF(TRIM(@quantity), ''),
    invoice_date = STR_TO_DATE(TRIM(@invoice_date), '%Y-%m-%d %H:%i:%s'),
    unit_price   = NULLIF(TRIM(@unit_price), ''),
    customer_id  = NULLIF(TRIM(@customer_id), ''),
    country      = NULLIF(TRIM(@country), '');
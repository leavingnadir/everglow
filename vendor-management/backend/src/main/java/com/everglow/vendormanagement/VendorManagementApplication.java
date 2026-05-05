package com.everglow.vendormanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.everglow.vendormanagement"})
public class VendorManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(VendorManagementApplication.class, args);
        System.out.println("Vendor Management System started successfully!");
    }
}

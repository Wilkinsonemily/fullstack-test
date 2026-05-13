package com.example.transaction_api.config;

import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.example.transaction_api.entity.Transaction;
import com.example.transaction_api.repository.TransactionRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import tools.jackson.databind.ObjectMapper;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (transactionRepository.count() > 0) {
            System.out.println("Database sudah ada data, skip seeding.");
            return;
        }

        System.out.println("Database kosong, mulai import dari viewData.json...");

        try {
            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream = new ClassPathResource("viewData.json").getInputStream();

            JsonData jsonData = mapper.readValue(inputStream, JsonData.class);

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            for (JsonTransaction item : jsonData.getData()) {
                Transaction trx = new Transaction();
                trx.setProductId(item.getProductID());
                trx.setProductName(item.getProductName());
                trx.setAmount(new BigDecimal(item.getAmount()));
                trx.setCustomerName(item.getCustomerName());
                trx.setStatus(item.getStatus());
                trx.setTransactionDate(LocalDateTime.parse(item.getTransactionDate(), dateFormatter));
                trx.setCreateBy(item.getCreateBy());
                trx.setCreateOn(LocalDateTime.parse(item.getCreateOn(), dateFormatter));

                transactionRepository.save(trx);
            }

            System.out.println("Berhasil import " + jsonData.getData().size() + " data dari viewData.json");

        } catch (Exception e) {
            System.err.println("Error saat import JSON: " + e.getMessage());
            e.printStackTrace();
        }
    }

   
    @Data
    public static class JsonData {
        private List<JsonTransaction> data;
    }

    @Data
    public static class JsonTransaction {
        private int id;

        @JsonProperty("productID")
        private String productID;

        private String productName;
        private String amount;
        private String customerName;
        private int status;
        private String transactionDate;
        private String createBy;
        private String createOn;
    }
}
package com.example.transaction_api.service;

import com.example.transaction_api.dto.TransactionDTO;
import com.example.transaction_api.entity.Transaction;
import com.example.transaction_api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction tidak ditemukan dengan id: " + id));
        return convertToDTO(transaction);
    }

    public TransactionDTO createTransaction(TransactionDTO dto) {
        Transaction transaction = convertToEntity(dto);
        transaction.setCreateOn(LocalDateTime.now());
        Transaction saved = transactionRepository.save(transaction);
        return convertToDTO(saved);
    }

    public TransactionDTO updateTransaction(Long id, TransactionDTO dto) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction tidak ditemukan dengan id: " + id));

        existing.setProductId(dto.getProductId());
        existing.setProductName(dto.getProductName());
        existing.setAmount(dto.getAmount());
        existing.setCustomerName(dto.getCustomerName());
        existing.setStatus(dto.getStatus());
        existing.setTransactionDate(dto.getTransactionDate());
        existing.setCreateBy(dto.getCreateBy());

        Transaction updated = transactionRepository.save(existing);
        return convertToDTO(updated);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("Transaction tidak ditemukan dengan id: " + id);
        }
        transactionRepository.deleteById(id);
    }

    private TransactionDTO convertToDTO(Transaction t) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(t.getId());
        dto.setProductId(t.getProductId());
        dto.setProductName(t.getProductName());
        dto.setAmount(t.getAmount());
        dto.setCustomerName(t.getCustomerName());
        dto.setStatus(t.getStatus());
        dto.setStatusName(t.getStatus() == 0 ? "SUCCESS" : "FAILED");
        dto.setTransactionDate(t.getTransactionDate());
        dto.setCreateBy(t.getCreateBy());
        dto.setCreateOn(t.getCreateOn());
        return dto;
    }

    private Transaction convertToEntity(TransactionDTO dto) {
        Transaction t = new Transaction();
        t.setId(dto.getId());
        t.setProductId(dto.getProductId());
        t.setProductName(dto.getProductName());
        t.setAmount(dto.getAmount());
        t.setCustomerName(dto.getCustomerName());
        t.setStatus(dto.getStatus());
        t.setTransactionDate(dto.getTransactionDate());
        t.setCreateBy(dto.getCreateBy());
        t.setCreateOn(dto.getCreateOn() != null ? dto.getCreateOn() : LocalDateTime.now());
        return t;
    }
}
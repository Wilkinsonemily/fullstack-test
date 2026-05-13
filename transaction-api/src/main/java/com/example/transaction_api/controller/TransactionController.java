package com.example.transaction_api.controller;

import com.example.transaction_api.dto.ApiResponse;
import com.example.transaction_api.dto.TransactionDTO;
import com.example.transaction_api.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getAll() {
        List<TransactionDTO> data = transactionService.getAllTransactions();
        return ResponseEntity.ok(new ApiResponse<>(true, "Berhasil mengambil data", data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionDTO>> getById(@PathVariable Long id) {
        try {
            TransactionDTO data = transactionService.getTransactionById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Berhasil mengambil data", data));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

   @PostMapping
    public ResponseEntity<ApiResponse<TransactionDTO>> create(@RequestBody TransactionDTO dto) {
        try {
            TransactionDTO created = transactionService.createTransaction(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Berhasil menambah data", created));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionDTO>> update(
            @PathVariable Long id,
            @RequestBody TransactionDTO dto) {
        try {
            TransactionDTO updated = transactionService.updateTransaction(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Berhasil update data", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        try {
            transactionService.deleteTransaction(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Berhasil hapus data", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
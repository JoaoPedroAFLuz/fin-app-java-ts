package br.senai.sc.services;

import br.senai.sc.models.Transaction;
import br.senai.sc.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Double getAccountBalance(Long accountId){
        return transactionRepository.getBalanceByAccountId(accountId);
    }

    public Transaction save(Transaction transaction){
        return transactionRepository.save(transaction);
    }

}

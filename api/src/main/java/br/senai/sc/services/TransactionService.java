package br.senai.sc.services;

import br.senai.sc.exceptions.InsufficientBalanceException;
import br.senai.sc.models.Transaction;
import br.senai.sc.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<Transaction> findByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    public Transaction register(Transaction transaction) {
        if (transaction.getValue().add(transaction.getAccount().getBalance()).doubleValue() < 0) {
            throw new InsufficientBalanceException("Saldo insuficiente");
        }
        return save(transaction);
    }

    public boolean existsByAccount(Long accountId) {
        return transactionRepository.existsByAccountId(accountId);
    }

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }


}

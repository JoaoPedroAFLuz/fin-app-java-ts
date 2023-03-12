package br.senai.sc.converters;

import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.dtos.NewTransactionDTO;
import br.senai.sc.dtos.TransactionDTO;
import br.senai.sc.dtos.enums.TransactionType;
import br.senai.sc.models.Account;
import br.senai.sc.models.Transaction;
import br.senai.sc.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class TransactionConverter {

    private final AccountService accountService;
    private final AccountConverter accountConverter;

    public Transaction dtoToEntity(NewTransactionDTO transactionDTO) {

        Account account = accountService.findById(transactionDTO.getAccountId());
        BigDecimal value = transactionDTO.getType() == TransactionType.CREDIT
                ? transactionDTO.getValue()
                : transactionDTO.getValue().negate();

        Transaction transaction = new Transaction();

        transaction.setAccount(account);
        transaction.setValue(value);

        return transaction;
    }

    public TransactionDTO entityToDTO(Transaction transaction) {

        AccountDTO accountDTO = accountConverter.entityToDTO(transaction.getAccount());

        TransactionDTO transactionDTO = new TransactionDTO();

        transactionDTO.setId(transaction.getId());
        transactionDTO.setAccountDTO(accountDTO);
        transactionDTO.setValue(transaction.getValue());
        transactionDTO.setDateTime(transaction.getDateTime());

        return transactionDTO;
    }
}

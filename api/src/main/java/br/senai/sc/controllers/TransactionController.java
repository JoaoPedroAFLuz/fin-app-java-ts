package br.senai.sc.controllers;

import br.senai.sc.converters.TransactionConverter;
import br.senai.sc.dtos.NewTransactionDTO;
import br.senai.sc.dtos.TransactionDTO;
import br.senai.sc.models.Transaction;
import br.senai.sc.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final TransactionConverter converter;

    @GetMapping("/by-account")
    public List<TransactionDTO> findByAccount(@RequestParam("accountId") Long accountId) {
        final List<Transaction> transactions = transactionService.findByAccountId(accountId);

        return transactions.stream().map(converter::entityToDTO).collect(Collectors.toList());
    }

    @PostMapping()
    public TransactionDTO register(@RequestBody @Valid NewTransactionDTO newTransactionDTO) {
        final Transaction transaction = converter.dtoToEntity(newTransactionDTO);
        final Transaction transactionPersisted = transactionService.register(transaction);

        return converter.entityToDTO(transactionPersisted);
    }

}

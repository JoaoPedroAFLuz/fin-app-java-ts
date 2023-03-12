package br.senai.sc.controllers;

import br.senai.sc.converters.TransactionConverter;
import br.senai.sc.dtos.NewTransactionDTO;
import br.senai.sc.dtos.TransactionDTO;
import br.senai.sc.models.Transaction;
import br.senai.sc.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final TransactionConverter converter;

    @PostMapping()
    public TransactionDTO register(@RequestBody @Valid NewTransactionDTO newTransactionDTO) {
        final Transaction transaction = converter.dtoToEntity(newTransactionDTO);
        final Transaction transactionPersisted = transactionService.save(transaction);

        return converter.entityToDTO(transactionPersisted);
    }

}

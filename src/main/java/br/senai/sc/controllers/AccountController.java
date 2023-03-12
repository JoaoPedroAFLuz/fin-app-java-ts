package br.senai.sc.controllers;

import br.senai.sc.converters.AccountConverter;
import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.dtos.NewAccountDTO;
import br.senai.sc.models.Account;
import br.senai.sc.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountConverter converter;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public AccountDTO register(@RequestBody @Valid NewAccountDTO newAccountDTO) {
        final Account account = converter.dtoToEntity(newAccountDTO);
        final Account accountPersisted = accountService.save(account);

        return converter.entityToDTO(accountPersisted);
    }

}


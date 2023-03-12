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
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountConverter converter;

    @GetMapping("/by-user")
    public List<AccountDTO> findByUserID(@RequestParam("userId") Long userId) {
        List<Account> accounts = accountService.findByUserId(userId);

        return accounts.stream().map(converter::entityToDTO).collect(Collectors.toList());
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public AccountDTO register(@RequestBody @Valid NewAccountDTO newAccountDTO) {
        final Account account = converter.dtoToEntity(newAccountDTO);
        final Account accountPersisted = accountService.save(account);

        return converter.entityToDTO(accountPersisted);
    }

}

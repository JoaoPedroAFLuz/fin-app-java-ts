package br.senai.sc.converters;

import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.dtos.NewAccountDTO;
import br.senai.sc.dtos.UserDTO;
import br.senai.sc.models.Account;
import br.senai.sc.models.User;
import br.senai.sc.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AccountConverter {

    private final UserConverter userConverter;
    private final UserService userService;

    public Account dtoToEntity(NewAccountDTO newAccountDTO) {

        User user = userService.findById(newAccountDTO.getUserId());

        final Account account = new Account();

        account.setRegistrationCode(newAccountDTO.getRegistrationCode());
        account.setUser(user);

        return account;
    }

    public AccountDTO entityToDTO(Account account) {

        UserDTO userDTO = userConverter.entityToDTO(account.getUser());

        final AccountDTO accountDTO = new AccountDTO();

        accountDTO.setId(account.getId());
        accountDTO.setRegistrationCode(account.getRegistrationCode());
        accountDTO.setUser(userDTO);
        accountDTO.setBalance(Objects.requireNonNullElse(account.getBalance(), BigDecimal.valueOf(0)));

        return accountDTO;
    }

}

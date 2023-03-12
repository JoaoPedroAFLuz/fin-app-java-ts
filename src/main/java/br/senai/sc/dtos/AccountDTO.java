package br.senai.sc.dtos;

import br.senai.sc.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class AccountDTO {

    private Long id;
    private Integer registrationCode;
    private UserDTO user;
    private BigDecimal balance;

    public AccountDTO(Long id, Integer registrationCode, User user, BigDecimal balance) {
        this.id = id;
        this.user = new UserDTO(user);
        this.registrationCode = registrationCode;
        this.balance = balance;
    }

}

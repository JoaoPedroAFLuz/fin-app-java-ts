package br.senai.sc.dtos;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDTO {

    private Long id;
    private LocalDateTime dateTime;
    private AccountDTO accountDTO;
    private BigDecimal value;

}

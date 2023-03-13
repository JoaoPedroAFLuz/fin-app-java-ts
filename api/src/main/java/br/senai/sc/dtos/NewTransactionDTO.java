package br.senai.sc.dtos;


import br.senai.sc.dtos.enums.TransactionType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
public class NewTransactionDTO {

    @NotNull(message = "Id da conta é obrigatório.")
    private Long accountId;

    @NotNull(message = "Valor da movimentação é obrigatório.")
    private BigDecimal value;

    @NotNull(message = "Tipo de movimentação é obrigatório.")
    private TransactionType type;

}

package br.senai.sc.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class NewAccountDTO {

    @NotNull(message = "Id do usuário é obrigatório.")
    private Long userId;

    @NotNull(message = "Número da conta é obrigatório.")
    private Integer registrationCode;

}

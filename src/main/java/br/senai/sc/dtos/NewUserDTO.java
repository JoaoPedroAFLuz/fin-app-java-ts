package br.senai.sc.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class NewUserDTO {

    @NotEmpty(message = "Nome é obrigatório")
    private String name;

    @NotEmpty(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotEmpty(message = "Endereço é obrigatório")
    private String address;

    @NotEmpty(message = "CPF é obrigatório")
    private String cpf;

}

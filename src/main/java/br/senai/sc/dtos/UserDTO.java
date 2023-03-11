package br.senai.sc.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String cpf;

}

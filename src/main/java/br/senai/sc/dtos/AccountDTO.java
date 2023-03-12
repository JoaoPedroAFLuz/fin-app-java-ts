package br.senai.sc.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {

    private Long id;
    private Integer registrationCode;
    private UserDTO user;

}

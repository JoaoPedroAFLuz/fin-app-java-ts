package br.senai.sc.dtos;

import br.senai.sc.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String cpf;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.cpf = user.getCpf();
    }

}

package br.senai.sc.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Campo obrigatório!")
    private String name;

    @NotEmpty(message = "Campo obrigatório!")
    @Email(message = "E-mail inválido!")
    @Column(unique = true)
    private String email;

    @NotEmpty(message = "Campo obrigatório.")
    private String address;

    @NotEmpty(message = "Campo obrigatório.")
    @Column(unique = true)
    private String cpf;
}

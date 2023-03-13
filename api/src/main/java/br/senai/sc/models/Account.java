package br.senai.sc.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotNull(message = "Número da conta é obrigatório.")
    private Integer registrationCode;

    @ManyToOne
    @NotNull(message = "Usuário é obrigatório.")
    private User user;

    @Formula("(SELECT SUM(COALESCE(t.value, 0)) "
            + "FROM transactions t "
            + "WHERE t.account_id = id)")
    private BigDecimal balance;

}

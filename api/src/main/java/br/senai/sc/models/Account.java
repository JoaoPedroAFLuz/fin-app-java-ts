package br.senai.sc.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
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
    private Integer registrationCode;

    @ManyToOne
    private User user;

    @Formula("(SELECT SUM(COALESCE(t.value, 0)) "
            + "FROM transactions t "
            + "WHERE t.account_id = id)")
    private BigDecimal balance;

}

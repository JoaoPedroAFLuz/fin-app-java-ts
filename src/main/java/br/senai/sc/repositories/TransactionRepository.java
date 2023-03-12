package br.senai.sc.repositories;

import br.senai.sc.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT SUM(COALESCE(t.value, 0)) "
            + "FROM Transaction t "
            + "JOIN Account a on a.id = t.account.id "
            + "WHERE a.id = :accountId")
    Double getBalanceByAccountId(@Param("accountId") Long accountId);
}

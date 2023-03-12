package br.senai.sc.repositories;

import br.senai.sc.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("FROM Transaction t ORDER BY t.dateTime DESC")
    List<Transaction> findByAccountId(Long accountId);

    @Query("SELECT SUM(COALESCE(t.value, 0)) "
            + "FROM Transaction t "
            + "RIGHT JOIN Account a on a.id = t.account.id "
            + "WHERE a.id = :accountId")
    Double getBalanceByAccountId(@Param("accountId") Long accountId);
}

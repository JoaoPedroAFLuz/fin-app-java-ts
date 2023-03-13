package br.senai.sc.repositories;

import br.senai.sc.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("FROM Transaction t WHERE t.account.id = :accountId ORDER BY t.dateTime DESC")
    List<Transaction> findByAccountId(@Param("accountId") Long accountId);

}

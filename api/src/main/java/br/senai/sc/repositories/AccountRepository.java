package br.senai.sc.repositories;

import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT new br.senai.sc.dtos.AccountDTO"
            + "(a.id, a.registrationCode, a.user, SUM(COALESCE(t.value, 0))) "
            + "FROM Account a "
            + "LEFT JOIN Transaction t ON t.account.id = a.id "
            + "WHERE a.user.id = :userId "
            + "GROUP BY a.id")
    List<AccountDTO> findByUserId(@Param("userId") Long userId);
}

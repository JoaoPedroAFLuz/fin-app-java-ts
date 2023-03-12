package br.senai.sc.services;

import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.exceptions.EntityNotFoundException;
import br.senai.sc.models.Account;
import br.senai.sc.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AccountService {
    private static final Logger LOG = Logger.getLogger(AccountService.class.getName());


    private final AccountRepository accountRepository;

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Account findById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada com id: " + id));
    }

    public List<AccountDTO> findByUserId(Long userId) {
        return accountRepository.findByUserId(userId);
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }

    public void delete(Long id) {
        accountRepository.deleteById(id);
    }
}

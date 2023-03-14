package br.senai.sc.services;

import br.senai.sc.dtos.AccountDTO;
import br.senai.sc.exceptions.EntityAlreadyExists;
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

    private final AccountRepository accountRepository;
    private final TransactionService transactionService;

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

    public Account register(Account account) {
        if (accountRepository.existsByRegistrationCode(account.getRegistrationCode())) {
            throw new EntityAlreadyExists("Já existe uma conta com número: " + account.getRegistrationCode());
        }

        return save(account);
    }


    public Account update(Long id, AccountDTO accountDTO) {
        Account account = findById(id);

        account.setRegistrationCode(accountDTO.getRegistrationCode());

        return account;
    }

    public void deleteById(Long id) {
        if(transactionService.existsByAccount(id)) {
            throw new RuntimeException("Não foi possível remover a conta, pois há transações relacionadas a ela.");
        }

        accountRepository.deleteById(id);
    }

    public boolean existsByUser(Long userId) {
        return accountRepository.existsByUserId(userId);
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }
}

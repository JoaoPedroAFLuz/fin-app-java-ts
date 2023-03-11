package br.senai.sc.services;

import br.senai.sc.exceptions.EntityNotFoundException;
import br.senai.sc.models.User;
import br.senai.sc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger LOG = Logger.getLogger(UserService.class.getName());

    private final UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o e-mail: " + email));
    }

    public User save(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            LOG.severe(e.getMessage());
            return null;
        }
    }

}

package br.senai.sc.services;

import br.senai.sc.models.User;
import br.senai.sc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger LOG = Logger.getLogger(UserService.class.getName());

    private final UserRepository userRepository;

    public User save(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            LOG.severe(e.getMessage());
            return null;
        }
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

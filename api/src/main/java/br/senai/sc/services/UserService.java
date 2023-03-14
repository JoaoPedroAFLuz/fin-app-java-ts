package br.senai.sc.services;

import br.senai.sc.dtos.UserDTO;
import br.senai.sc.exceptions.EntityAlreadyExists;
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

    private final UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o id: " + id));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o e-mail: " + email));
    }

    public User register(User user) {
        if (userRepository.existsByCpf(user.getCpf())) {
            throw new EntityAlreadyExists("Já existe um usuário cadastrado com o CPF: " + user.getCpf());
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EntityAlreadyExists("Já existe um usuário cadastrado com o email: " + user.getEmail());
        }

        return save(user);
    }

    public User update(Long id, UserDTO userDTO) {
        User user = findById(id);

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());

        return save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

}

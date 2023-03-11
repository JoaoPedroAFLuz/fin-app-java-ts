package br.senai.sc.converters;

import br.senai.sc.dtos.NewUserDTO;
import br.senai.sc.dtos.UserDTO;
import br.senai.sc.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public User dtoToEntity(NewUserDTO newUserData) {
        final User user = new User();

        user.setName(newUserData.getName());
        user.setCpf(newUserData.getCpf());
        user.setEmail(newUserData.getEmail());
        user.setAddress(newUserData.getAddress());

        return user;
    }

    public UserDTO entityToDTO(User user) {
        final UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setCpf(user.getCpf());

        return userDTO;
    }

}

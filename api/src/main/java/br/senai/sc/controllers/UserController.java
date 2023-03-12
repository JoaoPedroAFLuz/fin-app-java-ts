package br.senai.sc.controllers;

import br.senai.sc.converters.UserConverter;
import br.senai.sc.dtos.NewUserDTO;
import br.senai.sc.dtos.UserDTO;
import br.senai.sc.models.User;
import br.senai.sc.services.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserConverter converter;

    @GetMapping()
    public List<UserDTO> findAll() {
        List<User> users = userService.findAll();

        return users.stream().map(converter::entityToDTO).collect(Collectors.toList());
    }

    @GetMapping("by-email")
    public UserDTO findByEmail(@RequestParam("email") String email) {
        User user = userService.findByEmail(email);

        return converter.entityToDTO(user);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO register(@RequestBody @Valid NewUserDTO newUserData) {
        final User user = converter.dtoToEntity(newUserData);
        final User persistedUser = userService.save(user);

        return converter.entityToDTO(persistedUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }

}

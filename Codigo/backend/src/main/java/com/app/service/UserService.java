package com.app.service;

import com.app.dto.UserDto;
import com.app.entity.usuarios.Cargo;
import com.app.entity.usuarios.User;
import com.app.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> findAllFuncionarios() {
        Cargo cargo = Cargo.FUNCIONARIO;
        List<User> funcionarios = userRepository.findByCargo(cargo);
        return ResponseEntity.ok().body(funcionarios);
    }

    private boolean exists(String nome) {
        return userRepository.existsById(nome);
    }

    public ResponseEntity<?> createFuncionario(UserDto dto) {
        User funcionario = new User(dto.nome(), dto.senha(), Cargo.FUNCIONARIO);
        if (exists(funcionario.getNome())) {
            return ResponseEntity.badRequest().body("Funcionario já existe");
        }
        userRepository.save(funcionario);
        return ResponseEntity.ok().body(funcionario);
    }

    public ResponseEntity<?> deleteFuncionario(String nome) {
        if (!exists(nome)) {
            return ResponseEntity.badRequest().body("Funcionario não existe");
        }
        userRepository.deleteById(nome);
        return ResponseEntity.ok().body("Funcionario deletado");
    }

    public ResponseEntity<?> updateFuncionario(String nome, UserDto dto) {
        Optional<User> userOpt = userRepository.findById(nome);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            user.setNome(dto.nome());
            user.setCargo(Cargo.FUNCIONARIO);
            user.setSenha(dto.senha());

            userRepository.saveAndFlush(user);
            return ResponseEntity.ok().body("Funcionario atualizado");
        } else
            return ResponseEntity.badRequest().body("Funcionario com esse nome não existe");
    }

    public ResponseEntity<?> authenticate(UserDto userDto) {
        Optional<User> user = userRepository.findById(userDto.nome());
        if (user.isPresent()) {
            User existingUser = user.get();
            if (existingUser.getSenha().equals(userDto.senha())) {
                return ResponseEntity.ok(existingUser);
            } else {
                return ResponseEntity.badRequest().body("Senha incorreta");
            }
        } else {
            return ResponseEntity.badRequest().body("Funcionario não existe");
        }

    }

    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(userRepository.findAll());
    }
}

package com.app.controller;

import com.app.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/user/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("findAllFuncionarios")
    public ResponseEntity<?> findAllFuncionarios() {
        return userService.findAllFuncionarios();
    }

    @GetMapping("findAll")
    public ResponseEntity<?> findAll() {
        return userService.findAll();
    }

    @PostMapping("createFuncionario")
    public ResponseEntity<?> createFuncionario(@RequestBody UserDto dto) {
        return userService.createFuncionario(dto);
    }

    @PutMapping("updateFuncionario/{nome}")
    public ResponseEntity<?> updateFuncionario(@PathVariable String nome, @RequestBody UserDto dto) {
        return userService.updateFuncionario(nome, dto);
    }

    @DeleteMapping("deleteFuncionario/{nome}")
    public ResponseEntity<?> deleteFuncionario(@PathVariable String nome) {
        return userService.deleteFuncionario(nome);
    }
//@PostMapping("createAdmin")
//    public   ResponseEntity <?> createAdmin() {
//        return userService.createAdmin();
//    }


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        try {
            ResponseEntity<?> user = userService.authenticate(userDto);

            return ResponseEntity.ok().body(user);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }
}


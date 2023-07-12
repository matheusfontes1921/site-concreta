package com.app.controller;

import com.app.dto.ClienteDTO;
import com.app.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("api/cliente/")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("findall")
    public ResponseEntity<?> findAll() {
        return clienteService.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody ClienteDTO dto) {
        return clienteService.create(dto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        return clienteService.delete(id);
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody ClienteDTO dto) {
        return clienteService.update(dto);
    }

}

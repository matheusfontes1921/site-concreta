package com.app.service;

import com.app.dto.ClienteDTO;
import com.app.entity.Cliente;
import com.app.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ResponseEntity<?> create(ClienteDTO dto) {
        if (existsByNome(dto.nome())) {
            return ResponseEntity.badRequest().body("Já existe um cliente com esse nome");
        }

        Cliente cliente = dto.toCliente();
        clienteRepository.save(cliente);

        return ResponseEntity.ok(cliente);
    }

    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(clienteRepository.findAll());
    }

    public ResponseEntity<?> delete(UUID id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isEmpty()) {
            return ResponseEntity.badRequest().body("Não existe um cliente com esse id");
        }
        clienteRepository.delete(cliente.get());
        return ResponseEntity.ok().body(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<?> update(ClienteDTO dto) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(dto.id());
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            cliente.setNome(dto.nome());
            cliente.setImagem(dto.toImagem());
            clienteRepository.save(cliente);
            return ResponseEntity.ok().body(HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body("Não existe um cliente com esse id");
        }
    }

    private boolean existsByNome(String nome) {
        return clienteRepository.findByNome(nome).isPresent();
    }
}

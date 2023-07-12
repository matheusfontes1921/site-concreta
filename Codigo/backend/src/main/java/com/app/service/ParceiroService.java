package com.app.service;

import com.app.dto.ParceiroDto;
import com.app.entity.Parceiro;
import com.app.repository.ParceiroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ParceiroService {
    private final ParceiroRepository parceiroRepository;

    public ParceiroService(ParceiroRepository parceiroRepository) {
        this.parceiroRepository = parceiroRepository;
    }

    public ResponseEntity<?> create(ParceiroDto dto) {
        if (existsByNome(dto.nome())) {
            return ResponseEntity.badRequest().body("Já existe um parceiro com esse nome");
        }
        Parceiro parceiro = dto.toParceiro();
        parceiroRepository.save(parceiro);

        return ResponseEntity.ok(parceiro);
    }

    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(parceiroRepository.findAll());
    }

    public ResponseEntity<?> delete(UUID id) {
        Optional<Parceiro> parceiro = parceiroRepository.findById(id);
        if (parceiro.isEmpty()) {
            return ResponseEntity.badRequest().body("Não existe um parceiro com esse id");
        }
        parceiroRepository.delete(parceiro.get());
        return ResponseEntity.ok().body(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<?> update(ParceiroDto dto) {
        Optional<Parceiro> parceiroOptional = parceiroRepository.findById(dto.id());
        if (parceiroOptional.isPresent()) {
            Parceiro parceiro = parceiroOptional.get();
            parceiro.setNome(dto.nome());
            parceiro.setImagem(dto.toImagem());
            parceiroRepository.save(parceiro);
            return ResponseEntity.ok().body(HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body("Não existe um parceiro com esse id");
        }
    }

    private boolean existsByNome(String nome) {
        return parceiroRepository.findByNome(nome).isPresent();
    }
}

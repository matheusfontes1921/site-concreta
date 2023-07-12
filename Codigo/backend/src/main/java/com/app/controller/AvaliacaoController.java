package com.app.controller;

import com.app.dto.AvaliacaoDTO;
import com.app.service.AvaliacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/avaliacao/")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping(value = "create")
    public ResponseEntity<?> create(@RequestBody AvaliacaoDTO dto) {
        return avaliacaoService.create(dto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        avaliacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody AvaliacaoDTO dto) {
        return ResponseEntity.ok(avaliacaoService.update(dto.id(), dto));
    }

    @GetMapping("findAll")
    public ResponseEntity<?> findAll() {
        var avaliacao = avaliacaoService.findAll();
        return ResponseEntity.ok(avaliacao);
    }
}

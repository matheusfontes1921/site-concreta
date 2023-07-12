package com.app.controller;

import com.app.config.Metadado;
import com.app.dto.ServicoDto;
import com.app.dto.SubServicoDto;
import com.app.entity.Servico;
import com.app.service.ServicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "api/servicos/")
public class ServicoController {

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService, Metadado metadado) {
        this.servicoService = servicoService;
    }

    @GetMapping("findAll")
    public ResponseEntity<List<Servico>> findAll() {

        List<Servico> listaUsuarios = servicoService.findAll();

        return ResponseEntity.ok().body(listaUsuarios);
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody ServicoDto servicoDto) {
        return servicoService.create(servicoDto);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Servico> update(@PathVariable UUID id, @RequestBody ServicoDto dto) {
        var servicoAtualizado = servicoService.update(id, dto);
        return ResponseEntity.ok(servicoAtualizado);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        servicoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("find/{id}")
    public ResponseEntity<Servico> findByName(@PathVariable UUID id) {
        return ResponseEntity.ok().body(servicoService.findById(id));
    }

}

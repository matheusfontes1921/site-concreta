package com.app.controller;

import com.app.dto.ProjetoDto;
import com.app.entity.Projeto;
import com.app.service.ProjetoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/projeto/")
public class ProjetoController {

    private final ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    @GetMapping("findAll")
    public List<Projeto> listarProjetos() {
        return projetoService.listarProjetos();
    }

    @GetMapping("{id}")
    public Projeto buscarProjeto(@PathVariable UUID id) {
        return projetoService.findById(id);
    }

    @PostMapping("create")
    public Projeto create(@RequestBody ProjetoDto dto) {
        return projetoService.create(dto);
    }

    @PutMapping("atualizar")
    public Projeto atualizarProjeto(@RequestBody ProjetoDto projetoAtualizado) {
        return projetoService.update(projetoAtualizado.id(), projetoAtualizado);
    }

    @DeleteMapping("delete/{id}")
    public void deletarProjeto(@PathVariable UUID id) {
        projetoService.delete(id);
    }

    @PutMapping("inserirImagem/{id}")
    public ResponseEntity<?> inserirImagem(@PathVariable UUID id, @RequestBody String imagem) {
        return projetoService.inserirImagem(id, imagem);
    }

    @DeleteMapping("deleteImagem/{idProjeto}/{idImagem}")
    public ResponseEntity<?> deleteImagem(@PathVariable UUID idProjeto, @PathVariable UUID idImagem) {
        return projetoService.removerImagem(idProjeto,idImagem);
    }
}

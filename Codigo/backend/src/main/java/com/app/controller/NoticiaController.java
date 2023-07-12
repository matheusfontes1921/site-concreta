package com.app.controller;

import com.app.dto.NoticiaDto;
import com.app.entity.Noticia;
import com.app.service.NoticiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public List<Noticia> listarNoticias() {
        return noticiaService.listarNoticias();
    }

    @PostMapping
    public ResponseEntity<Noticia> criarNoticia(@RequestBody NoticiaDto noticia) {
        ResponseEntity<Noticia> responseEntity = noticiaService.create(noticia);
        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }

    @PutMapping("atualizar")
    public ResponseEntity<Noticia> atualizarNoticia(@RequestBody NoticiaDto noticia) {
        Noticia noticiaAtualizada = noticiaService.update(noticia);
        return ResponseEntity.ok(noticiaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirNoticia(@PathVariable UUID id) {
        try {
            return noticiaService.delete(id);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }



}


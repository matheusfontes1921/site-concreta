package com.app.controller;

import com.app.dto.ImagemDto;
import com.app.entity.Servico;
import com.app.service.ImagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/imagens/")
public class ImagemController {
    private final  ImagemService imagemService;
    public ImagemController(ImagemService imagemService) {
        this.imagemService = imagemService;
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody ImagemDto servicoDto) {
        return imagemService.create(servicoDto);
    }
    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        imagemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Servico> update(@PathVariable UUID id, @RequestBody ImagemDto dto) {
        var servicoAtualizado = imagemService.update(id, dto);
        return ResponseEntity.ok().build();
    }
}

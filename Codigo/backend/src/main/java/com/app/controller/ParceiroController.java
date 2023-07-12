package com.app.controller;

import com.app.dto.ParceiroDto;
import com.app.service.ParceiroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.repository.ParceiroRepository;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("api/parceiro/")
public class ParceiroController {
    private final ParceiroService parceiroService;

    public ParceiroController(ParceiroService parceiroService) {
        this.parceiroService = parceiroService;
    }

    @GetMapping("findall")
    public ResponseEntity<?> findAll() {
        return parceiroService.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody ParceiroDto dto) {
        return parceiroService.create(dto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        return parceiroService.delete(id);
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody ParceiroDto dto) {
        return parceiroService.update(dto);
    }

}

package com.app.controller;


import com.app.dto.SubServicoDto;
import com.app.entity.Servico;
import com.app.entity.SubServico;
import com.app.service.ServicoService;
import com.app.service.SubServicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "api/subservicos/")
@CrossOrigin()
public class SubservicoController {
    private final SubServicoService subServicoService;
    private final ServicoService servicoService;

    public SubservicoController(SubServicoService subServicoService, ServicoService servicoService) {
        this.subServicoService = subServicoService;
        this.servicoService = servicoService;
    }

    @GetMapping("findAll")
    public ResponseEntity<?> findAll() {

        List<SubServico> listaSubServico= subServicoService.findAll();
        List<SubServicoDto> listaSubServicoDto = new LinkedList<>();

        listaSubServico.forEach(subServico -> {
            SubServicoDto subServicoDto = new SubServicoDto(
                    subServico.getId(),
                    subServico.getNome(),
                    subServico.getImagem().getUrl(),
                    subServico.getDescricao(),
                    subServico.getServico().getId()
            );

            listaSubServicoDto.add(subServicoDto);
        });

        return ResponseEntity.ok().body(listaSubServicoDto);
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody SubServicoDto subServicoDto) {
        if (subServicoService.findByNome(subServicoDto.nome()).isPresent())
            return ResponseEntity.badRequest().body("subServico ja existe");

        Servico servico = servicoService.findById(subServicoDto.servicoId());

        if (servico == null)
            return ResponseEntity.badRequest().body("Servico nao existe");

        SubServico novoSubServico = subServicoService.create(subServicoDto, servico);
        return ResponseEntity.ok().body(novoSubServico);
    }

    @PutMapping(value = "update/{id}")
    public ResponseEntity<?> update(@RequestBody SubServicoDto subServicoDto, @PathVariable UUID id) {
        SubServico updatedSubServico = subServicoService.update(subServicoDto, id);
        return ResponseEntity.ok(updatedSubServico);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {

        subServicoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

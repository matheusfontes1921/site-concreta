package com.app.service;

import com.app.dto.ServicoDto;
import com.app.dto.SubServicoDto;
import com.app.entity.Imagem;
import com.app.entity.Servico;
import com.app.entity.SubServico;
import com.app.repository.ServicoRepository;
import com.app.repository.SubServicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;
    private final SubServicoRepository subServicoRepository;

    public ServicoService(ServicoRepository repo, SubServicoRepository subServicoRepository) {
        this.servicoRepository = repo;
        this.subServicoRepository = subServicoRepository;
    }

    public Boolean existByNome(String name) {
        return servicoRepository.findServicoByNome(name).isPresent();
    }

    public Boolean existById(UUID id) {
        return servicoRepository.findById(id).isPresent();
    }

    public Servico findById(UUID id) {
        return servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
    }

    public Servico update(UUID id, ServicoDto dto) {
        var service = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        service.setNome(dto.nome());
        service.setImagem(dto.toImagem());
        return servicoRepository.saveAndFlush(service);
    }

    public void delete(UUID id) {
        Servico servicoDeletar = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        subServicoRepository.deleteAll(servicoDeletar.getSubservicos());
        servicoRepository.delete(servicoDeletar);
    }

    public List<Servico> findAll() {
        return servicoRepository.findAll();
    }

    /* Service */

    public ResponseEntity<?> create(ServicoDto servicoDto) {

        if (existByNome(servicoDto.nome()))
            return ResponseEntity.badRequest().body("Servico ja existe");

        Servico novoServico = new Servico(servicoDto.nome(), servicoDto.toImagem());
        servicoRepository.save(novoServico);
        return ResponseEntity.ok().body(novoServico);
    }


    public SubServico inserirSubservico(SubServicoDto dto) {
        var service = servicoRepository.findById(dto.servicoId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        Imagem imagem = new Imagem(dto.imagemString());
        SubServico subServico = new SubServico(dto.nome(), dto.descricao(), imagem, service);
        service.getSubservicos().add(subServico);
        servicoRepository.save(service);
        subServicoRepository.save(subServico);
        return subServico;
    }
}

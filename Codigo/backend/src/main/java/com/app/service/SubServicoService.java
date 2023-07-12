package com.app.service;

import com.app.dto.SubServicoDto;
import com.app.entity.Imagem;
import com.app.entity.Servico;
import com.app.entity.SubServico;
import com.app.repository.ServicoRepository;
import com.app.repository.SubServicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubServicoService {
    private final SubServicoRepository subServicoRepository;
    private final ServicoService servicoService;
    private final ServicoRepository servicoRepository;

    public SubServicoService(SubServicoRepository subServicoRepository, ServicoService servicoService, ServicoRepository servicoRepository) {
        this.subServicoRepository = subServicoRepository;
        this.servicoService = servicoService;
        this.servicoRepository = servicoRepository;
    }


    public SubServico create(SubServicoDto subServicoDto, Servico servico) {
        Imagem imagem = new Imagem(subServicoDto.imagemString());
        SubServico novoSubServico = new SubServico(subServicoDto.nome(), subServicoDto.descricao(), imagem,
                servico);

        return subServicoRepository.save(novoSubServico);
    }

    public Optional<SubServico> findByNome(String name) {
        return subServicoRepository.findByNome(name);
    }

    public SubServico update(SubServicoDto subServicoDto, UUID id) {
        SubServico subServico = subServicoRepository.findById(id).orElseThrow(() -> new RuntimeException("Subservico a ser alterado não encontrado"));
        Servico servicoNovo = servicoService.findById(subServicoDto.servicoId());
        Imagem imagem = new Imagem(subServicoDto.imagemString());
        subServico.setServico(servicoNovo);
        subServico.setNome(subServicoDto.nome());
        subServico.setImagem(imagem);
        subServico.setDescricao(subServicoDto.descricao());

        return subServicoRepository.save(subServico);
    }

    public List<SubServico> findAll() {
        return subServicoRepository.findAll();
    }

    public void delete(UUID id) {
        SubServico subServico = subServicoRepository.findById(id).orElseThrow(() -> new RuntimeException("Subservico a ser alterado não encontrado"));
        Servico servico = servicoService.findById(subServico.getServico().getId());
        servico.getSubservicos().remove(subServico);
        subServicoRepository.delete(subServico);
        servicoRepository.saveAndFlush(servico);

    }

}

package com.app.service;

import com.app.dto.AvaliacaoDTO;
import com.app.entity.Avaliacao;
import com.app.entity.Projeto;
import com.app.repository.AvaliacaoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final ProjetoService projetoService;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository, ProjetoService projetoService) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.projetoService = projetoService;
    }

    public ResponseEntity<?> create(AvaliacaoDTO dto) {
        Projeto projeto = projetoService.findById(dto.projetoId());
        if (projeto == null)
            return ResponseEntity.badRequest().body("Projeto não existe");
        Avaliacao avaliacao = new Avaliacao(dto.nome(), dto.toImagem(), dto.subtitulo(), dto.descricao(), projeto);
        avaliacaoRepository.save(avaliacao);
        return ResponseEntity.ok(avaliacao);
    }

    public ResponseEntity<?> delete(UUID id) {
        if (!existAvaliacao(id))
            return ResponseEntity.badRequest().body("Avaliacao nao existe");
        avaliacaoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private boolean existAvaliacao(UUID id) {
        return avaliacaoRepository.findById(id).isPresent();
    }


    public ResponseEntity<?> update(UUID id, AvaliacaoDTO dto) {
        if (!existAvaliacao(id))
            return ResponseEntity.badRequest().body("Avaliacao nao existe");
        else {
            Avaliacao avaliacao = avaliacaoRepository.findById(id).get();
            avaliacao.setNome(dto.nome());
            avaliacao.setImagem(dto.toImagem());
            avaliacao.setSubtitulo(dto.subtitulo());
            avaliacao.setDescricao(dto.descricao());
            avaliacaoRepository.save(avaliacao);
            return ResponseEntity.ok().build();
        }
    }

public ResponseEntity<?> findAll() {
        var avaliacao = avaliacaoRepository.findAll();
        return ResponseEntity.ok().body(avaliacao);
    }
}
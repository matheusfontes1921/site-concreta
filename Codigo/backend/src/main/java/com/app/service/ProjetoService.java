package com.app.service;

import com.app.dto.ProjetoDto;
import com.app.entity.Avaliacao;
import com.app.entity.Imagem;
import com.app.entity.Projeto;
import com.app.repository.AvaliacaoRepository;
import com.app.repository.ImagemRepository;
import com.app.repository.ProjetoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjetoService {

    private final ProjetoRepository projetoRepository;
    private final ImagemRepository imagemRepository;
    private final AvaliacaoRepository avaliacaoRepository;

    public ProjetoService(ProjetoRepository projetoRepository, ImagemRepository imagemRepository, AvaliacaoRepository avaliacaoRepository) {
        this.projetoRepository = projetoRepository;
        this.imagemRepository = imagemRepository;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public List<Projeto> listarProjetos() {
        return projetoRepository.findAll();
    }

    public Projeto findById(UUID id) {
        return projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado"));
    }

    public Projeto create(ProjetoDto dto) {
        Projeto projeto = new Projeto(dto.titulo(), dto.descricao());
        return projetoRepository.save(projeto);
    }

    public Projeto update(UUID id, ProjetoDto projetoAtualizado) {
        projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado"));

        Projeto projeto = findById(id);
        projeto.setTitulo(projetoAtualizado.titulo());
        projeto.setDescricao(projetoAtualizado.descricao());

        return projetoRepository.save(projeto);
    }

    public void delete(UUID id) {
        Projeto projeto = findById(id);
        List<Avaliacao> avalicoes = avaliacaoRepository.findAllByProjeto(projeto);

        avaliacaoRepository.deleteAll(avalicoes);
        projetoRepository.deleteById(projeto.getId());
    }

    public ResponseEntity<?> inserirImagem(UUID id, String imagem) {
        Projeto projeto = findById(id);
        Imagem img = new Imagem(imagem);
        projeto.getListaImagens().add(img);
        projetoRepository.save(projeto);
        imagemRepository.save(img);
        return ResponseEntity.ok(projeto);
    }

    public ResponseEntity<?> removerImagem(UUID idProjeto, UUID idImagem) {
        Projeto projeto = findById(idProjeto);
        Imagem img = imagemRepository.findById(idImagem)
                .orElseThrow(() -> new EntityNotFoundException("Imagem não encontrada"));
        projeto.getListaImagens().remove(img);
        projetoRepository.save(projeto);
        imagemRepository.delete(img);
        return ResponseEntity.noContent().build();
    }
}
package com.app.service;

import com.app.dto.NoticiaDto;
import com.app.entity.Noticia;
import com.app.repository.NoticiaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    public NoticiaService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    public List<Noticia> listarNoticias() {
        return noticiaRepository.findAll();
    }


    public ResponseEntity<Noticia> create(NoticiaDto dto) {
        if (!noticiaRepository.existsByTitulo(dto.titulo())) {
            Noticia noticiaNova = new Noticia(dto.titulo(), dto.conteudo(), dto.url());
            Noticia noticiaSalva = noticiaRepository.save(noticiaNova);
            return ResponseEntity.status(HttpStatus.CREATED).body(noticiaSalva);
        } else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(null);
        }
    }

    public ResponseEntity<Void> delete(UUID id) {
        Optional<Noticia> noticiaOptional = noticiaRepository.findById(id);
        if (noticiaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        noticiaRepository.delete(noticiaOptional.get());
        return ResponseEntity.noContent().build();
    }

    public Noticia update(NoticiaDto noticia) {
        assert noticia.id() != null;
        Optional<Noticia> noticiaOptional = noticiaRepository.findById(noticia.id());
        if (noticiaOptional.isEmpty()) {
            throw new NoSuchElementException("Notícia não encontrada");
        }
        Noticia noticiaExistente = noticiaOptional.get();
        noticiaExistente.setTitulo(noticia.titulo());
        noticiaExistente.setConteudo(noticia.conteudo());
        noticiaExistente.setUrl(noticia.url());

        return noticiaRepository.save(noticiaExistente);
    }

}
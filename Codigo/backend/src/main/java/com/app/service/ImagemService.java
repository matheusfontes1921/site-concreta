package com.app.service;

import com.app.dto.ImagemDto;
import com.app.entity.Imagem;
import com.app.repository.ImagemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ImagemService {

    private final ImagemRepository imagemRepository;

    public ImagemService(ImagemRepository imagemRepository) {
        this.imagemRepository = imagemRepository;
    }

    public Imagem update(UUID url, ImagemDto dto) {
        var imagem = imagemRepository.findById(url)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        imagem.setUrl(dto.url());
        return imagemRepository.saveAndFlush(imagem);
    }

    public ResponseEntity<?> create(ImagemDto imagemDto) {
        if (existImagem(imagemDto.url()))
            return ResponseEntity.badRequest().body("Imagem ja existe");
        Imagem imagem = new Imagem(imagemDto.url());
        imagemRepository.save(imagem);
        return ResponseEntity.ok().body("Imagem criada com sucesso");
    }


    private Boolean existImagem(String url) {
        return imagemRepository.findByUrl(url).isPresent();
    }

    public void delete(UUID id) {
        var imagem = imagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada"));

        imagemRepository.delete(imagem);
    }
}

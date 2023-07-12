package com.app.repository;

import com.app.entity.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImagemRepository extends JpaRepository<Imagem, UUID> {

    Optional<Imagem> findByUrl(String url);
}

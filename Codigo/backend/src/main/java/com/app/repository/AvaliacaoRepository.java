package com.app.repository;

import com.app.entity.Avaliacao;
import com.app.entity.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, UUID> {


     List<Avaliacao> findAllByProjeto(Projeto projeto);

    Optional findByNome(String nome);
}

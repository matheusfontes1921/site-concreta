package com.app.repository;

import com.app.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, UUID> {
    Optional<Servico> findById(UUID id);

    Optional<Servico>findServicoByNome(String name);


    void deleteByNome(String name);
}

package com.app.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entity.Parceiro;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ParceiroRepository extends JpaRepository<Parceiro, UUID> {

    Optional<Parceiro> findByNome(String nome);
}

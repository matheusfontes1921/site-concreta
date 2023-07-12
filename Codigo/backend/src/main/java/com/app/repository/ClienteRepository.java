package com.app.repository;

import com.app.entity.Parceiro;
import org.springframework.stereotype.Repository;

import com.app.entity.Cliente;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
    Optional<Cliente> findByNome(String nome);
}

package com.app.repository;

import com.app.entity.SubServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface SubServicoRepository extends JpaRepository<SubServico, UUID> {
   Optional<SubServico> findByNome(String nome);

    List<SubServico> findAll();
}

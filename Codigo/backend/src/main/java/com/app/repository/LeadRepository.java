package com.app.repository;

import com.app.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LeadRepository extends JpaRepository<Lead, UUID> {

//    @Query("SELECT S " +
//            "FROM Lead L " +
//            "WHERE L.servico.id = :id")
//    LinkedList<Servico> countServicosLead(
//            @Param("id") UUID id_servico);

}

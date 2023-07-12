package com.app.controller;

import java.util.UUID;

import com.app.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LeadDto;
import com.app.service.RdStationService;

@RestController
@RequestMapping("/api/rd/")
public class RdStationController {

    /* Construtor e Serviço */

    private final RdStationService rdStationService;
    private final EmailService emailService;

    private final String email_send = "gustavo.riegert@evoluaenergia.com.br";

    public RdStationController(RdStationService rdStationService, EmailService emailService) {
        this.rdStationService = rdStationService;
        this.emailService = emailService;
    }

    /* Endpoints */

    @PostMapping("gerarOrcamento")
    public ResponseEntity<?> gerarOrcamento(
            @RequestBody LeadDto leadDto) {

        ResponseEntity<?> responseEntity = rdStationService.cadastraLead(leadDto);

        emailService.sendMessage(email_send, "Você gerou um orçamento");

        return responseEntity;
    }

    @GetMapping("quantidadeLeadsEmServicoById/{id}")
    public ResponseEntity<?> quantidadeLeadsEmServicoById(
            @PathVariable UUID id) {
        return rdStationService.quantidadeLeadsEmServicoById(id);
    }

}

package com.app.service;

import com.app.config.IntegrationConfiguration;
import com.app.dto.LeadDto;
import com.app.entity.Lead;
import com.app.entity.Servico;
import com.app.mapper.LeadMapper;
import com.app.repository.LeadRepository;
import com.app.repository.ServicoRepository;
import com.squareup.okhttp.*;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Service
public class RdStationService {

    /* Construtor e Repository */

    private final LeadRepository leadRepository;

    private final ServicoRepository servicoRepository;

    public RdStationService(LeadRepository leadRepository, ServicoRepository servicoRepository) {
        this.leadRepository = leadRepository;
        this.servicoRepository = servicoRepository;
    }

    /* Comunicação JPA */

    public ResponseEntity<?> cadastraLead(LeadDto leadDto) {

        Optional<Servico> servico = servicoRepository.findById(leadDto.id_servico());

        if (servico.isEmpty()) {
            return new ResponseEntity<>("Serviço não existe", HttpStatusCode.valueOf(403));
        }

        Lead lead_salvar = LeadMapper.leadMapper(leadDto, servico.get());

        leadRepository.save(lead_salvar);

        this.salvaLead(leadDto);

        return ResponseEntity.ok(lead_salvar.getId());

    }

    public ResponseEntity<?> quantidadeLeadsEmServicoById(UUID id) {

        Optional<Servico> servico = servicoRepository.findById(id);

        if (servico.isEmpty()) {
            return new ResponseEntity<>("Serviço não existe", HttpStatusCode.valueOf(403));
        }

        long quantidade = quantidadeLeadComServico(id);

        HashMap<String, Long> json = new HashMap<>();

        json.put("Quantidade", quantidade);

        return ResponseEntity.ok(json);
    }

    /* Util */

    public long quantidadeLeadComServico(UUID id) {

//        LinkedList<Servico> servicos = leadRepository.countServicosLead(id);
//
//        long quantidade = servicos.stream().count();
//
//        return quantidade;

        return 1L;
    }

    public void salvaLead(LeadDto leadDto) {

        OkHttpClient client = new OkHttpClient();

        String application = "application/json";

        MediaType mediaType = MediaType.parse(application);

        RequestBody body = RequestBody.create(mediaType,
                "{" +
                        "\"nome\" : \"" + leadDto.nome() + "\", " +
                        "\"email\" : \"" + leadDto.email() + "\", " +
                        "}");

        Request request = new Request.Builder()
                .url("https://api.rd.services/platform/contacts")
                .post(body)
                .addHeader("accept", application)
                .addHeader("content-type", application)
                .addHeader("authorization", "Bearer " + IntegrationConfiguration.ACESS_TOKEN)
                .build();

        try {

            Response response = client.newCall(request).execute();

            System.out.println(response.body().toString());

        } catch (IOException e) {
            System.out.println("ERROR ao salvar lead in RD Station: " + e.getMessage());
        }
    }

}

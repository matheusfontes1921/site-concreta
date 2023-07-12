package com.app.mapper;

import com.app.dto.LeadDto;
import com.app.entity.Lead;
import com.app.entity.Servico;

public class LeadMapper {

    public static Lead leadMapper(LeadDto leadDto, Servico servico) {

        return new Lead(
                leadDto.nome(),
                leadDto.email(),
                leadDto.descricao(),
                leadDto.telefone(),
                leadDto.descoberta(),
                servico);
    }

}

package com.app.mapper;

import com.app.dto.ClienteAlterarDTO;
import com.app.dto.ClienteDTO;
import com.app.entity.Cliente;

public class ClienteMapper {

    public static Cliente clienteMapper(ClienteDTO clienteDTO) {

        return new Cliente(
                clienteDTO.nome(),
                clienteDTO.toImagem());
    }



}

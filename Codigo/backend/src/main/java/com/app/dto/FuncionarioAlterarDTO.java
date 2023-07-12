package com.app.dto;

import java.util.UUID;

public record FuncionarioAlterarDTO(

        UUID id,

        String nome,

        String senha

) {

}

package com.app.dto;

import java.util.UUID;

public record ClienteAlterarDTO(

        UUID id,

        String email,

        String telefone

) {

}

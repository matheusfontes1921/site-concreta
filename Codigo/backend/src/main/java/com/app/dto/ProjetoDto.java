package com.app.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record ProjetoDto(@NotBlank UUID id, String titulo, String descricao) {
}

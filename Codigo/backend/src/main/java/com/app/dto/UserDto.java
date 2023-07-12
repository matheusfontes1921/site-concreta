package com.app.dto;

import com.app.entity.usuarios.Cargo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UserDto(@NotEmpty String nome, @NotEmpty String senha, @NotNull Cargo cargo) {
}

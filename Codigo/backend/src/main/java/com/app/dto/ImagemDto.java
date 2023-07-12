package com.app.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ImagemDto(@Nullable UUID id, @NotNull String url) {
    public ImagemDto(@NotNull @NotBlank String url) {
        this(null, url);
    }
}


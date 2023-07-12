package com.app.dto;

import java.util.List;
import java.util.UUID;

public record CreateUserRoleDto(UUID idUser, List<UUID> idsRoles) {}

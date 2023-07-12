package com.app.repository;

import com.app.entity.usuarios.Cargo;
import com.app.entity.usuarios.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    public List<User> findByCargo(Cargo cargo);
}


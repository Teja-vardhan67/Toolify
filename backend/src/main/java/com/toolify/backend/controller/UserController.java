package com.toolify.backend.controller;

import com.toolify.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final List<User> users = new ArrayList<>();

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        user.setId(UUID.randomUUID().toString());
        user.setTrustRating(100.0);
        user.setItemsShared(0);
        user.setSuccessfulHandovers(0);
        user.setFailureProtocols(0);
        users.add(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        return users.stream()
            .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return users.stream()
            .filter(u -> u.getId().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

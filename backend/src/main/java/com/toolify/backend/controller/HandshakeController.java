package com.toolify.backend.controller;

import com.toolify.backend.model.Handshake;
import com.toolify.backend.service.HandshakeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/handshakes")
@CrossOrigin(origins = "*")
public class HandshakeController {

    private final HandshakeService handshakeService;

    public HandshakeController(HandshakeService handshakeService) {
        this.handshakeService = handshakeService;
    }

    @PostMapping
    public ResponseEntity<Handshake> createHandshake(@RequestBody Handshake handshake) {
        try {
            return ResponseEntity.ok(handshakeService.createHandshake(handshake));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Handshake>> getHandshakesByOwner(@PathVariable String ownerId) {
        try {
            return ResponseEntity.ok(handshakeService.getHandshakesByOwner(ownerId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/borrower/{borrowerId}")
    public ResponseEntity<List<Handshake>> getHandshakesByBorrower(@PathVariable String borrowerId) {
        try {
            return ResponseEntity.ok(handshakeService.getHandshakesByBorrower(borrowerId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Handshake> approveHandshake(@PathVariable String id) {
        try {
            return ResponseEntity.ok(handshakeService.updateHandshakeStatus(id, "approved"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Handshake> rejectHandshake(@PathVariable String id) {
        try {
            return ResponseEntity.ok(handshakeService.updateHandshakeStatus(id, "rejected"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}

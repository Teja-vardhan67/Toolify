package com.toolify.backend.controller;

import com.toolify.backend.model.Tool;
import com.toolify.backend.service.ToolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(origins = "*")
public class ToolController {

    private final ToolService toolService;

    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    @GetMapping
    public ResponseEntity<List<Tool>> getAllTools() {
        try {
            return ResponseEntity.ok(toolService.getAllTools());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tool> getToolById(@PathVariable String id) {
        try {
            Tool tool = toolService.getToolById(id);
            if (tool != null) {
                return ResponseEntity.ok(tool);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping
    public ResponseEntity<Tool> createTool(@RequestBody Tool tool) {
        try {
            return ResponseEntity.ok(toolService.createTool(tool));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Tool>> getToolsByOwner(@PathVariable String ownerId) {
        try {
            return ResponseEntity.ok(toolService.getToolsByOwner(ownerId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}

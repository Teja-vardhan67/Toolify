package com.toolify.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.toolify.backend.model.Tool;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ToolService {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "tools";

    public ToolService(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<Tool> getAllTools() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Tool> tools = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            Tool tool = document.toObject(Tool.class);
            if (tool != null) {
                tool.setId(document.getId());
                tools.add(tool);
            }
        }
        return tools;
    }

    public Tool getToolById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            Tool tool = document.toObject(Tool.class);
            if (tool != null) {
                tool.setId(document.getId());
            }
            return tool;
        }
        return null;
    }

    public Tool createTool(Tool tool) throws ExecutionException, InterruptedException {
        // If an ID is provided, use it; otherwise let Firestore generate one
        DocumentReference docRef;
        if (tool.getId() != null && !tool.getId().isEmpty()) {
            docRef = firestore.collection(COLLECTION_NAME).document(tool.getId());
        } else {
            docRef = firestore.collection(COLLECTION_NAME).document();
            tool.setId(docRef.getId());
        }
        ApiFuture<WriteResult> result = docRef.set(tool);
        result.get(); // Wait for completion
        return tool;
    }

    public List<Tool> getToolsByOwner(String ownerId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).whereEqualTo("ownerId", ownerId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Tool> tools = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            Tool tool = document.toObject(Tool.class);
            if (tool != null) {
                tool.setId(document.getId());
                tools.add(tool);
            }
        }
        return tools;
    }
}

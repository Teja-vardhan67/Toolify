package com.toolify.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.toolify.backend.model.Handshake;
import com.toolify.backend.model.Tool;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class HandshakeService {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "handshakes";
    private final ToolService toolService;

    public HandshakeService(Firestore firestore, ToolService toolService) {
        this.firestore = firestore;
        this.toolService = toolService;
    }

    public Handshake createHandshake(Handshake handshake) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
        handshake.setId(docRef.getId());
        handshake.setStatus("pending");
        handshake.setCreatedAt(Instant.now().toString());

        ApiFuture<WriteResult> result = docRef.set(handshake);
        result.get(); // Wait
        return handshake;
    }

    public List<Handshake> getHandshakesByOwner(String ownerId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).whereEqualTo("ownerId", ownerId).get();
        return parseHandshakes(future);
    }

    public List<Handshake> getHandshakesByBorrower(String borrowerId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).whereEqualTo("borrowerId", borrowerId).get();
        return parseHandshakes(future);
    }

    private List<Handshake> parseHandshakes(ApiFuture<QuerySnapshot> future) throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Handshake> handshakes = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            Handshake h = document.toObject(Handshake.class);
            if (h != null) {
                h.setId(document.getId());
                handshakes.add(h);
            }
        }
        return handshakes;
    }

    public Handshake updateHandshakeStatus(String handshakeId, String status) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(handshakeId);
        docRef.update("status", status).get();

        // Fetch it again to return
        DocumentSnapshot document = docRef.get().get();
        Handshake h = document.toObject(Handshake.class);
        if (h != null) h.setId(document.getId());

        // If approved, update the tool status to in_use
        if ("approved".equals(status) && h != null) {
            Tool tool = toolService.getToolById(h.getToolId());
            if(tool != null) {
                tool.setStatus("in_use");
                tool.setBorrower(h.getBorrowerId());
                tool.setLockedUntil(h.getReturnDate());
                
                DocumentReference toolRef = firestore.collection("tools").document(tool.getId());
                toolRef.set(tool).get();
            }
        }

        return h;
    }
}

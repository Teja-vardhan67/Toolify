package com.toolify.backend.model;

public class Handshake {
    private String id;
    private String toolId;
    private String borrowerId;
    private String ownerId;
    private String returnDate;
    private String status;     // "pending", "approved", "completed", "rejected"
    private boolean safetyAgreed;
    private String createdAt;

    public Handshake() {}

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getToolId() { return toolId; }
    public void setToolId(String toolId) { this.toolId = toolId; }

    public String getBorrowerId() { return borrowerId; }
    public void setBorrowerId(String borrowerId) { this.borrowerId = borrowerId; }

    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isSafetyAgreed() { return safetyAgreed; }
    public void setSafetyAgreed(boolean safetyAgreed) { this.safetyAgreed = safetyAgreed; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}

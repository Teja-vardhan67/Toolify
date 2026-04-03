package com.toolify.backend.model;

public class User {
    private String id;
    private String name;
    private String email;
    private String organizationId;
    private double trustRating;
    private int itemsShared;
    private int successfulHandovers;
    private int failureProtocols;

    public User() {}

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOrganizationId() { return organizationId; }
    public void setOrganizationId(String organizationId) { this.organizationId = organizationId; }

    public double getTrustRating() { return trustRating; }
    public void setTrustRating(double trustRating) { this.trustRating = trustRating; }

    public int getItemsShared() { return itemsShared; }
    public void setItemsShared(int itemsShared) { this.itemsShared = itemsShared; }

    public int getSuccessfulHandovers() { return successfulHandovers; }
    public void setSuccessfulHandovers(int successfulHandovers) { this.successfulHandovers = successfulHandovers; }

    public int getFailureProtocols() { return failureProtocols; }
    public void setFailureProtocols(int failureProtocols) { this.failureProtocols = failureProtocols; }
}

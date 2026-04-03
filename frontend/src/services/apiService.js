export const toolService = {
  async getAll() {
    const response = await fetch('/api/tools');
    if (!response.ok) throw new Error('Failed to fetch tools');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`/api/tools/${id}`);
    if (!response.ok) throw new Error('Failed to fetch tool');
    return response.json();
  },

  async getByOwner(ownerId) {
    const response = await fetch(`/api/tools/owner/${ownerId}`);
    if (!response.ok) throw new Error('Failed to fetch owner tools');
    return response.json();
  },

  async create(toolData) {
    const response = await fetch('/api/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toolData),
    });
    if (!response.ok) throw new Error('Failed to create tool');
    return response.json();
  }
};

export const handshakeService = {
  async requestBorrow(handshakeData) {
    const response = await fetch('/api/handshakes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(handshakeData),
    });
    if (!response.ok) throw new Error('Failed to request borrow');
    return response.json();
  },

  async getByOwner(ownerId) {
    const response = await fetch(`/api/handshakes/owner/${ownerId}`);
    if (!response.ok) throw new Error('Failed to fetch owner handshakes');
    return response.json();
  },

  async getByBorrower(borrowerId) {
    const response = await fetch(`/api/handshakes/borrower/${borrowerId}`);
    if (!response.ok) throw new Error('Failed to fetch borrower handshakes');
    return response.json();
  },

  async approve(id) {
    const response = await fetch(`/api/handshakes/${id}/approve`, { method: 'PUT' });
    if (!response.ok) throw new Error('Failed to approve handshake');
    return response.json();
  },

  async reject(id) {
    const response = await fetch(`/api/handshakes/${id}/reject`, { method: 'PUT' });
    if (!response.ok) throw new Error('Failed to reject handshake');
    return response.json();
  }
};

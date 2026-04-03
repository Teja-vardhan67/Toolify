import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

// ==================== TOOLS ====================

const toolsRef = collection(db, 'tools');

export const toolService = {
  // Get all tools
  async getAll() {
    const snapshot = await getDocs(toolsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get tool by ID
  async getById(id) {
    const docRef = doc(db, 'tools', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  // Create new tool
  async create(toolData) {
    const docRef = await addDoc(toolsRef, {
      ...toolData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...toolData };
  },

  // Update tool
  async update(id, data) {
    const docRef = doc(db, 'tools', id);
    await updateDoc(docRef, data);
    return { id, ...data };
  }
};

// ==================== USERS ====================

const usersRef = collection(db, 'users');

export const userService = {
  // Create user profile
  async createProfile(uid, userData) {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...userData,
      trustRating: 100.0,
      itemsShared: 0,
      successfulHandovers: 0,
      failureProtocols: 0,
      createdAt: serverTimestamp()
    }).catch(() => {
      // If doc doesn't exist, create it
      return addDoc(usersRef, {
        ...userData,
        uid,
        trustRating: 100.0,
        itemsShared: 0,
        successfulHandovers: 0,
        failureProtocols: 0,
        createdAt: serverTimestamp()
      });
    });
  },

  // Get user profile
  async getProfile(uid) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }
};

// ==================== HANDSHAKES ====================

const handshakesRef = collection(db, 'handshakes');

export const handshakeService = {
  // Create borrow request
  async create(handshakeData) {
    const docRef = await addDoc(handshakesRef, {
      ...handshakeData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...handshakeData, status: 'pending' };
  },

  // Get all handshakes for a user
  async getByUser(userId) {
    const q = query(handshakesRef, where('borrowerId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Approve handshake
  async approve(id) {
    const docRef = doc(db, 'handshakes', id);
    await updateDoc(docRef, { status: 'approved' });
  }
};

// ==================== ACTIVITY FEED ====================

const activityRef = collection(db, 'activity_feed');

export const activityService = {
  // Log activity
  async log(entry) {
    await addDoc(activityRef, {
      ...entry,
      timestamp: serverTimestamp()
    });
  },

  // Get recent activity
  async getRecent(limit = 10) {
    const q = query(activityRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.slice(0, limit).map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

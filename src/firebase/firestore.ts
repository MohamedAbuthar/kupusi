// src/firebase/firestore.ts
import { 
  collection, 
  addDoc, 
  Timestamp, 
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { db } from './config';

// Types
export interface Reservation {
  name: string;
  email: string;
  phone: string;
  message?: string;
  timestamp: Date;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

// Firestore collections
export const RESERVATIONS_COLLECTION = 'reservations';

// Reservation operations
export const addReservation = async (reservationData: ReservationData) => {
  try {
    const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
      ...reservationData,
      timestamp: Timestamp.now(),
      status: 'new'
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding reservation:', error);
    return { success: false, error };
  }
};

export const getReservations = async () => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION), 
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const reservations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: reservations };
  } catch (error) {
    console.error('Error getting reservations:', error);
    return { success: false, error };
  }
};

export const getReservationById = async (id: string) => {
  try {
    const docRef = doc(db, RESERVATIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Reservation not found' };
    }
  } catch (error) {
    console.error('Error getting reservation:', error);
    return { success: false, error };
  }
};

export const updateReservationStatus = async (id: string, status: Reservation['status']) => {
  try {
    const docRef = doc(db, RESERVATIONS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    console.error('Error updating reservation:', error);
    return { success: false, error };
  }
};

export const deleteReservation = async (id: string) => {
  try {
    await deleteDoc(doc(db, RESERVATIONS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return { success: false, error };
  }
};
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
  id?: string;
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

export interface Property {
  id?: string;
  title: string;
  type: 'resort' | 'farmhouse' | 'villa';
  description: string;
  detailedDescription: string;
  price: number;
  priceUnit: string;
  images: string[];
  amenities: string[];
  location: string;
  size: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
  villaType?: 'forest-canopy' | 'valley-mist' | 'river-stone';
  view?: string;
  pool?: boolean;
  createdAt: Date;
}

export interface BookingReservation {
  id?: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  totalPrice?: number;
}

export interface BookingData {
  propertyId: string;
  propertyTitle: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  totalPrice?: number;
}

// Firestore collections
export const RESERVATIONS_COLLECTION = 'reservations';
export const PROPERTIES_COLLECTION = 'properties';
export const BOOKINGS_COLLECTION = 'bookings';

// ===== RESERVATION OPERATIONS =====

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
    
    const reservations: Reservation[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || '',
        status: data.status,
        timestamp: data.timestamp.toDate(),
      };
    });
    
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
      const data = docSnap.data();
      const reservation: Reservation = {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || '',
        status: data.status,
        timestamp: data.timestamp.toDate(),
      };
      return { success: true, data: reservation };
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

// ===== PROPERTY OPERATIONS =====

export const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
      ...propertyData,
      createdAt: Timestamp.now(),
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding property:', error);
    return { success: false, error };
  }
};

export const getProperties = async (type?: Property['type']) => {
  try {
    let q;
    if (type) {
      // This query requires a composite index
      q = query(
        collection(db, PROPERTIES_COLLECTION),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
    } else {
      // Simple query - no index needed
      q = query(collection(db, PROPERTIES_COLLECTION), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        type: data.type,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        priceUnit: data.priceUnit,
        images: data.images || [],
        amenities: data.amenities || [],
        location: data.location,
        size: data.size,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        featured: data.featured || false,
        villaType: data.villaType,
        view: data.view,
        pool: data.pool,
        createdAt: data.createdAt.toDate(),
      };
    });
    
    return { success: true, data: properties };
  } catch (error: any) {
    console.error('Error getting properties:', error);
    
    // If it's an index error, provide helpful message
    if (error.code === 'failed-precondition') {
      console.error('Firestore index required. Please create the composite index in Firebase Console.');
    }
    
    return { success: false, error };
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const property: Property = {
        id: docSnap.id,
        title: data.title,
        type: data.type,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        priceUnit: data.priceUnit,
        images: data.images || [],
        amenities: data.amenities || [],
        location: data.location,
        size: data.size,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        featured: data.featured || false,
        villaType: data.villaType,
        view: data.view,
        pool: data.pool,
        createdAt: data.createdAt.toDate(),
      };
      return { success: true, data: property };
    } else {
      return { success: false, error: 'Property not found' };
    }
  } catch (error) {
    console.error('Error getting property:', error);
    return { success: false, error };
  }
};

export const updateProperty = async (id: string, updates: Partial<Property>) => {
  try {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    await updateDoc(docRef, updates);
    return { success: true };
  } catch (error) {
    console.error('Error updating property:', error);
    return { success: false, error };
  }
};

export const deleteProperty = async (id: string) => {
  try {
    await deleteDoc(doc(db, PROPERTIES_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error };
  }
};

export const getFeaturedProperties = async () => {
  try {
    // This query requires a composite index: featured + createdAt
    const q = query(
      collection(db, PROPERTIES_COLLECTION),
      where('featured', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        type: data.type,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        priceUnit: data.priceUnit,
        images: data.images || [],
        amenities: data.amenities || [],
        location: data.location,
        size: data.size,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        featured: data.featured || false,
        villaType: data.villaType,
        view: data.view,
        pool: data.pool,
        createdAt: data.createdAt.toDate(),
      };
    });
    
    return { success: true, data: properties };
  } catch (error: any) {
    console.error('Error getting featured properties:', error);
    
    // If it's an index error, fall back to simple query
    if (error.code === 'failed-precondition') {
      console.log('Falling back to simple featured properties query');
      const q = query(
        collection(db, PROPERTIES_COLLECTION),
        where('featured', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const properties: Property[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          type: data.type,
          description: data.description,
          detailedDescription: data.detailedDescription,
          price: data.price,
          priceUnit: data.priceUnit,
          images: data.images || [],
          amenities: data.amenities || [],
          location: data.location,
          size: data.size,
          capacity: data.capacity,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          featured: data.featured || false,
          villaType: data.villaType,
          view: data.view,
          pool: data.pool,
          createdAt: data.createdAt.toDate(),
        };
      });
      
      // Sort manually by createdAt since we can't use orderBy
      properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return { success: true, data: properties };
    }
    
    return { success: false, error };
  }
};

export const getPropertiesByType = async (type: Property['type']) => {
  try {
    // This query requires a composite index: type + createdAt
    const q = query(
      collection(db, PROPERTIES_COLLECTION),
      where('type', '==', type),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        type: data.type,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        priceUnit: data.priceUnit,
        images: data.images || [],
        amenities: data.amenities || [],
        location: data.location,
        size: data.size,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        featured: data.featured || false,
        villaType: data.villaType,
        view: data.view,
        pool: data.pool,
        createdAt: data.createdAt.toDate(),
      };
    });
    
    return { success: true, data: properties };
  } catch (error: any) {
    console.error('Error getting properties by type:', error);
    
    // If it's an index error, fall back to simple query
    if (error.code === 'failed-precondition') {
      console.log('Falling back to simple properties by type query');
      const q = query(
        collection(db, PROPERTIES_COLLECTION),
        where('type', '==', type)
      );
      
      const querySnapshot = await getDocs(q);
      const properties: Property[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          type: data.type,
          description: data.description,
          detailedDescription: data.detailedDescription,
          price: data.price,
          priceUnit: data.priceUnit,
          images: data.images || [],
          amenities: data.amenities || [],
          location: data.location,
          size: data.size,
          capacity: data.capacity,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          featured: data.featured || false,
          villaType: data.villaType,
          view: data.view,
          pool: data.pool,
          createdAt: data.createdAt.toDate(),
        };
      });
      
      // Sort manually by createdAt since we can't use orderBy
      properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return { success: true, data: properties };
    }
    
    return { success: false, error };
  }
};

// Alternative function that doesn't require composite indexes
export const getAllPropertiesSimple = async () => {
  try {
    const q = query(collection(db, PROPERTIES_COLLECTION));
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        type: data.type,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        priceUnit: data.priceUnit,
        images: data.images || [],
        amenities: data.amenities || [],
        location: data.location,
        size: data.size,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        featured: data.featured || false,
        villaType: data.villaType,
        view: data.view,
        pool: data.pool,
        createdAt: data.createdAt.toDate(),
      };
    });
    
    return { success: true, data: properties };
  } catch (error) {
    console.error('Error getting all properties:', error);
    return { success: false, error };
  }
};

// ===== BOOKING OPERATIONS =====

export const addBooking = async (bookingData: BookingData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding booking:', error);
    return { success: false, error };
  }
};

export const getBookings = async () => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const bookings: BookingReservation[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        propertyType: data.propertyType,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || '',
        status: data.status,
        totalPrice: data.totalPrice,
        createdAt: data.createdAt.toDate(),
      };
    });
    
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error getting bookings:', error);
    return { success: false, error };
  }
};

export const getBookingById = async (id: string) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const booking: BookingReservation = {
        id: docSnap.id,
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        propertyType: data.propertyType,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || '',
        status: data.status,
        totalPrice: data.totalPrice,
        createdAt: data.createdAt.toDate(),
      };
      return { success: true, data: booking };
    } else {
      return { success: false, error: 'Booking not found' };
    }
  } catch (error) {
    console.error('Error getting booking:', error);
    return { success: false, error };
  }
};

export const updateBookingStatus = async (id: string, status: BookingReservation['status']) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error };
  }
};

export const deleteBooking = async (id: string) => {
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error };
  }
};

// Utility function to get villa types
export const getVillaTypes = () => {
  return [
    { value: 'forest-canopy', label: 'Forest Canopy Villa' },
    { value: 'valley-mist', label: 'Valley Mist Villa' },
    { value: 'river-stone', label: 'River Stone Villa' }
  ];
};

// Utility function to get property types
export const getPropertyTypes = () => {
  return [
    { value: 'resort', label: 'Resort & Retreats' },
    { value: 'farmhouse', label: 'Farmhouse Stay' },
    { value: 'villa', label: 'Luxury Villa' }
  ];
};
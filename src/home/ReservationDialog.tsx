"use client"
import React, { useState } from 'react';
import { X, Calendar, Users } from 'lucide-react';
import { addBooking, type BookingData, type Property } from '@/firebase/firestore';

interface ReservationDialogProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationDialog({ property, isOpen, onClose }: ReservationDialogProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return nights * property.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const bookingData: BookingData = {
        propertyId: property.id || '',
        propertyTitle: property.title,
        propertyType: property.type,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
        totalPrice: calculateTotalPrice()
      };

      const result = await addBooking(bookingData);
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            checkIn: '',
            checkOut: '',
            guests: 2,
            name: '',
            email: '',
            phone: '',
            specialRequests: ''
          });
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  const totalPrice = calculateTotalPrice();
  const nights = totalPrice / property.price;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-serif">Reserve {property.title}</h2>
            <p className="text-gray-600">Complete your booking details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Property Summary */}
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <img
              src={property.images[0] || '/placeholder.jpg'}
              alt={property.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-emerald-700 font-semibold">
                ${property.price}/{property.priceUnit}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Check-in Date
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          {/* Special Requests */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              placeholder="Any special requirements or requests..."
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
            />
          </div>

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Booking Summary</h4>
              <div className="flex justify-between text-sm">
                <span>${property.price} x {nights} night{nights !== 1 ? 's' : ''}</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-amber-200">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-700 text-center mb-4">
              Thank you! Your reservation request has been submitted. We'll contact you soon to confirm.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-700 text-center mb-4">
              Sorry, there was an error submitting your reservation. Please try again.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting 
                ? 'bg-amber-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600'
            } text-white py-4 rounded-lg font-semibold text-lg transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Request Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
}
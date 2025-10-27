"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPropertyById, type Property } from '@/firebase/firestore';
import { MapPin, Users, Bed, Bath, Star, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ReservationDialog from '@/home/ReservationDialog';

// Static properties data with proper typing
const staticProperties: Record<string, Property> = {
  'static-resort': {
    id: 'static-resort',
    title: 'Kupusi Resort & Retreats',
    type: 'resort',
    description: 'Experience ultimate luxury in pristine rainforest. Twelve exclusive villas with private pools, world-class spa, and farm-to-table dining.',
    detailedDescription: 'Nestled within untouched rainforest, Kupusi Resort & Retreats offers an unparalleled fusion of luxury and nature. Our philosophy centers on mindful hospitality, where every detail is crafted to restore, rejuvenate, and reconnect you with the earth\'s natural rhythms.',
    price: 850,
    priceUnit: 'night',
    images: ['/prope1.jpg'],
    amenities: ['12 Luxury Villas', 'Infinity Pools', 'Spa & Wellness Center', 'Fine Dining Restaurant', 'Guided Nature Walks'],
    location: 'Private Rainforest Reserve',
    size: '500 Acres',
    capacity: 24,
    bedrooms: 12,
    bathrooms: 12,
    featured: true,
    createdAt: new Date()
  },
  'static-farmhouse': {
    id: 'static-farmhouse',
    title: 'Kupusi Farmhouse',
    type: 'farmhouse',
    description: 'Authentic countryside experience on our working organic farm. Rustic luxury meets sustainable living with farm-fresh meals and pastoral tranquility.',
    detailedDescription: 'Our farmhouse offers a slower pace of life, where you can reconnect with the land and experience the rhythms of rural living. Wake to rooster calls, enjoy meals made from ingredients picked steps from your door, and fall asleep to the sounds of nature.',
    price: 320,
    priceUnit: 'night',
    images: ['/prope2.jpg'],
    amenities: ['Farmhouse Accommodations', 'Organic Farm Tours', 'Farm-to-Table Meals', 'Animal Interactions', 'Cooking Workshops'],
    location: 'Countryside Valley',
    size: '50 Acres',
    capacity: 8,
    bedrooms: 4,
    bathrooms: 4,
    featured: true,
    createdAt: new Date()
  },
  'static-forest-canopy': {
    id: 'static-forest-canopy',
    title: 'Forest Canopy Villa',
    type: 'villa',
    description: 'Suspended among ancient trees with panoramic rainforest views and private infinity pool.',
    detailedDescription: 'Experience the magic of living among the treetops in our Forest Canopy Villa. This architectural marvel offers breathtaking views, complete privacy, and direct connection with the surrounding rainforest.',
    price: 850,
    priceUnit: 'night',
    images: ['/Forest canopy.jpg'],
    amenities: ['King Bed', 'Private Pool', 'Forest Views', 'Outdoor Shower', 'Private Deck'],
    location: 'Rainforest Canopy',
    size: '1200 sq ft',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    villaType: 'forest-canopy',
    view: 'Panoramic Forest',
    pool: true,
    createdAt: new Date()
  },
  'static-valley-mist': {
    id: 'static-valley-mist',
    title: 'Valley Mist Villa',
    type: 'villa',
    description: 'Perched on a hillside overlooking misty valleys, with floor-to-ceiling windows.',
    detailedDescription: 'Wake up to mystical valley views as the morning mist rolls through the hills. The Valley Mist Villa features expansive glass walls that bring the outside in, creating a seamless connection with nature.',
    price: 920,
    priceUnit: 'night',
    images: ['/forestcanopyvilla.jpg'],
    amenities: ['King Bed', 'Valley Views', 'Spa Bath', 'Private Terrace', 'Floor-to-Ceiling Windows'],
    location: 'Hillside Overlook',
    size: '1100 sq ft',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    villaType: 'valley-mist',
    view: 'Valley Panorama',
    pool: false,
    createdAt: new Date()
  },
  'static-river-stone': {
    id: 'static-river-stone',
    title: 'River Stone Villa',
    type: 'villa',
    description: 'Riverside sanctuary with natural stone features and soothing water sounds.',
    detailedDescription: 'Find tranquility by the riverside in our River Stone Villa. Built with natural materials and featuring a meditation deck overlooking the water, this villa offers the ultimate peaceful retreat.',
    price: 780,
    priceUnit: 'night',
    images: ['/riverstone.jpg'],
    amenities: ['King Bed', 'River Views', 'Stone Bath', 'Meditation Deck', 'Private Riverside Access'],
    location: 'Riverside',
    size: '1000 sq ft',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    villaType: 'river-stone',
    view: 'River Front',
    pool: false,
    createdAt: new Date()
  }
};

// Separate component that uses useSearchParams
function PropertyContent() {
  const searchParams = useSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showReservationDialog, setShowReservationDialog] = useState(false);

  const propertyId = searchParams.get('id');

  useEffect(() => {
    if (propertyId) {
      loadProperty();
    } else {
      setLoading(false);
    }
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      if (!propertyId) {
        setLoading(false);
        return;
      }

      // Handle static properties
      if (propertyId.startsWith('static-')) {
        const staticProperty = staticProperties[propertyId];
        if (staticProperty) {
          setProperty(staticProperty);
        } else {
          console.error('Static property not found:', propertyId);
        }
        setLoading(false);
      } else {
        // Handle Firebase properties
        const result = await getPropertyById(propertyId);
        if (result.success && result.data) {
          setProperty(result.data);
        } else {
          console.error('Firebase property not found:', propertyId);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading property:', error);
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property) {
      setCurrentImage((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-2xl">Loading property details...</div>
      </div>
    );
  }

  if (!propertyId) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">No property selected</div>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Property not found</div>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden mb-8">
          {property.images.length > 0 ? (
            <div className="relative aspect-[4/3] md:aspect-[16/9]">
              <img
                src={property.images[currentImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.jpg';
                }}
              />
              
              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImage + 1} / {property.images.length}
                </div>
              )}

              {/* Dot Indicators */}
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentImage === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[4/3] md:aspect-[16/9] flex items-center justify-center bg-gray-300">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">🏠</div>
                <p>No image available</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {property.images.length > 1 && (
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-4">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    currentImage === index 
                      ? 'border-amber-500 scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>Up to {property.capacity} guests</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
                </div>
                <div>
                  <span>{property.size}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-gray-900">About this property</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-line">{property.detailedDescription || property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-serif mb-6 text-gray-900">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-amber-50 rounded-lg transition-colors">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images Grid */}
            {property.images.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-serif mb-6 text-gray-900">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className="aspect-square rounded-lg overflow-hidden group relative"
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6">
              <div className="text-3xl font-semibold text-emerald-800 mb-2">
                ${property.price}
                <span className="text-sm font-normal text-gray-600 ml-1">/{property.priceUnit}</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">Prices may vary based on season</p>
              
              <button 
                onClick={() => setShowReservationDialog(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Reserve Now
              </button>
              
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">Up to {property.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bedrooms:</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bathrooms:</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-medium">{property.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Dialog */}
      {property && (
        <ReservationDialog
          property={property}
          isOpen={showReservationDialog}
          onClose={() => setShowReservationDialog(false)}
        />
      )}
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function PropertiesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PropertyContent />
    </Suspense>
  );
}
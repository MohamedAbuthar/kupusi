"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, Infinity, Star, MapPin, Phone, Mail, Globe, Calendar,CirclePause } from 'lucide-react';
import { addReservation, type ReservationData, getProperties, type Property } from '@/firebase/firestore';
import Link from 'next/link';

export default function KupusiResort() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [properties, setProperties] = useState<Property[]>([]);
  const [villas, setVillas] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const [propertiesResult, villasResult] = await Promise.all([
        getProperties(),
        getProperties('villa')
      ]);

      if (propertiesResult.success) {
        setProperties(propertiesResult.data || []);
      }
      if (villasResult.success) {
        setVillas(villasResult.data || []);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const reservationData: ReservationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      const result = await addReservation(reservationData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        console.error('Failed to submit reservation:', result.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties-section');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVillas = () => {
    const villasSection = document.getElementById('villas-section');
    if (villasSection) {
      villasSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPropertiesByType = (type: Property['type']) => {
    return properties.filter(property => property.type === type);
  };

  const resortProperties = getPropertiesByType('resort');
  const farmhouseProperties = getPropertiesByType('farmhouse');

  const staticResortProperties = [
    {
      id: 'static-resort',
      title: 'Kupusi Resort & Retreats',
      type: 'resort' as const,
      description: 'Experience ultimate luxury in pristine rainforest. Twelve exclusive villas with private pools, world-class spa, and farm-to-table dining.',
      detailedDescription: 'Nestled within untouched rainforest, Kupusi Resort & Retreats offers an unparalleled fusion of luxury and nature.',
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
    }
  ];

  const staticFarmhouseProperties = [
    {
      id: 'static-farmhouse',
      title: 'Kupusi Farmhouse',
      type: 'farmhouse' as const,
      description: 'Authentic countryside experience on our working organic farm. Rustic luxury meets sustainable living with farm-fresh meals and pastoral tranquility.',
      detailedDescription: 'Our farmhouse offers a slower pace of life, where you can reconnect with the land.',
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
    }
  ];

  const staticVillas = [
    {
      id: 'static-forest-canopy',
      title: 'Forest Canopy Villa',
      type: 'villa' as const,
      description: 'Suspended among ancient trees with panoramic rainforest views and private infinity pool.',
      detailedDescription: 'Experience the magic of living among the treetops.',
      price: 850,
      priceUnit: 'night',
      images: ['/luxury.jpeg'],
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
    {
      id: 'static-valley-mist',
      title: 'Valley Mist Villa',
      type: 'villa' as const,
      description: 'Perched on a hillside overlooking misty valleys, with floor-to-ceiling windows.',
      detailedDescription: 'Wake up to mystical valley views.',
      price: 920,
      priceUnit: 'night',
      images: ['/luxury.jpeg'],
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
    {
      id: 'static-river-stone',
      title: 'River Stone Villa',
      type: 'villa' as const,
      description: 'Riverside sanctuary with natural stone features and soothing water sounds.',
      detailedDescription: 'Find tranquility by the riverside.',
      price: 780,
      priceUnit: 'night',
      images: ['/luxury.jpeg'],
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
  ];

  const displayResortProperties = resortProperties.length > 0 ? resortProperties : staticResortProperties;
  const displayFarmhouseProperties = farmhouseProperties.length > 0 ? farmhouseProperties : staticFarmhouseProperties;
  const displayVillas = villas.length > 0 ? villas : staticVillas;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Fully Responsive */}
      <section className="relative min-h-screen h-screen bg-[#2F6F4F] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/prope1.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-emerald-900/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-4 sm:mb-6 tracking-tight">
            Kupusi
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl text-white font-light">
              Resort & Retreats
            </h2>
            <span className="text-white hidden sm:inline">•</span>
            <h2 className="text-lg sm:text-xl md:text-2xl text-white font-light">
              Farmhouse Stays
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Two exceptional properties. One philosophy: luxury in harmony with nature.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <button 
              onClick={scrollToContact}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto text-sm sm:text-base"
            >
              Reserve Your Stay
            </button>
            <button 
              onClick={scrollToProperties}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              View Properties
            </button>
          </div>
          
          <div className="text-white/80 text-xs sm:text-sm px-4">
            Also available on: 
            <a href="https://www.airbnb.co.in/" target="_blank" rel="noopener noreferrer" className="underline ml-2 hover:text-white">Airbnb</a>
            <span className="mx-2">•</span>
            <a href="https://www.booking.com/index.en.html?aid=2405329;label=brave_brand_0151da16-fea3-4437-9100-d8fddfc2ce5d_dbfcb1" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Booking.com</a>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </section>

      {/* Sanctuary Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">
                A Sanctuary for the Soul
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-amber-500 mb-4 sm:mb-6"></div>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Nestled within untouched rainforest, Kupusi Resort & Retreats offers an unparalleled fusion of luxury and nature. Our philosophy centers on mindful hospitality, where every detail is crafted to restore, rejuvenate, and reconnect you with the earth's natural rhythms.
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                With only twelve exclusive villas, we ensure an intimate experience where privacy meets exceptional service, and modern comfort harmonizes with ancient wilderness.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 md:order-2">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="text-3xl sm:text-4xl font-serif text-emerald-800 mb-2">12</div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Exclusive Villas</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="text-3xl sm:text-4xl font-serif text-emerald-800 mb-2">500</div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Acres of Wilderness</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <Infinity className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-800 mb-2" />
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Moments of Peace</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 fill-emerald-800" />
                  <span className="text-2xl sm:text-3xl font-serif text-emerald-800">5</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Luxury Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Properties Section - Responsive */}
      <section id="properties-section" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">Our Properties</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Two distinctive experiences, one philosophy: reconnect with nature in uncompromising comfort.
            </p>
            
            <div className="mt-4 sm:mt-6">
              <Link 
                href="/admin"
                className="inline-block bg-emerald-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
              >
                Manage Properties (Admin)
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {displayResortProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={property.images[0] || '/prope1.jpg'} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    From ${property.price}/{property.priceUnit}
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="p-5 sm:p-6 lg:p-8">
                  <h3 className="text-2xl sm:text-3xl font-serif mb-2">{property.title}</h3>
                  <div className="text-amber-600 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 font-medium">
                    Luxury Wilderness Sanctuary
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {property.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {property.amenities.slice(0, 5).map((amenity, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-amber-500 mr-2">•</span>
                        <span className="text-gray-700">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                      onClick={scrollToContact}
                      className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                    >
                      Book Now
                    </button>
                    <Link 
                      href={`/properties?id=${property.id}`}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-emerald-900 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center text-sm sm:text-base"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {displayFarmhouseProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={property.images[0] || '/prope2.jpg'} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    From ${property.price}/{property.priceUnit}
                  </div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="p-5 sm:p-6 lg:p-8">
                  <h3 className="text-2xl sm:text-3xl font-serif mb-2">{property.title}</h3>
                  <div className="text-amber-600 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 font-medium">
                    Rural Retreat & Organic Farm Stay
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {property.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {property.amenities.slice(0, 5).map((amenity, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-amber-500 mr-2">•</span>
                        <span className="text-gray-700">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                      onClick={scrollToContact}
                      className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                    >
                      Book Now
                    </button>
                    <Link 
                      href={`/properties?id=${property.id}`}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-emerald-900 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center text-sm sm:text-base"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Villas Section - Responsive */}
      <section id="villas-section" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">Luxury Villas</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Each villa is a masterpiece of sustainable architecture, seamlessly integrated into the natural landscape.
            </p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="luxury.jpeg" 
              alt="Luxury Villas at Kupusi"
              className="w-full h-56 sm:h-72 md:h-96 object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayVillas.map((villa) => (
              <div key={villa.id} className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4">{villa.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {villa.description}
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {villa.amenities.slice(0, 4).map((amenity, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{amenity}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-emerald-800 font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  ${villa.price}/{villa.priceUnit}
                </div>
                <Link 
                  href={`/properties?id=${villa.id}`}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-emerald-900 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-center block text-sm sm:text-base"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmhouse Living Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <div className="rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96">
              <img 
                src="farmhouse.jpeg" 
                alt="Farmhouse Living"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">Farmhouse Living</h2>
              <div className="w-16 sm:w-20 h-1 bg-amber-500 mb-4 sm:mb-6"></div>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Our farmhouse offers a slower pace of life, where you can reconnect with the land and experience the rhythms of rural living. Wake to rooster calls, enjoy meals made from ingredients picked steps from your door, and fall asleep to the sounds of nature.
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The renovated 19th-century farmhouse features four guest rooms, each with period furnishings, modern amenities, and views of rolling pastures and gardens.
              </p>
            </div>
          </div>

          <div className="mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-center mb-6 sm:mb-8">Farm Activities</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">Morning Farm Rituals</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Start your day collecting fresh eggs, feeding heritage chickens, and harvesting vegetables for breakfast.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">Artisan Cheese Making</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Learn traditional cheese-making techniques using milk from our dairy herd.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">Organic Garden Tours</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Explore our permaculture gardens and discover sustainable farming practices.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-serif mb-2 sm:mb-3">Sunset Hayrides</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Enjoy scenic countryside views on our vintage tractor-drawn wagon.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl font-serif text-center mb-6 sm:mb-8">What's Included</h3>
            
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🥚</div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Farm Breakfast</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Fresh eggs, bread & preserves</p>
              </div>
              
              <div>
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🌾</div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Daily Activities</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Guided farm tours & workshops</p>
              </div>
              
              <div>
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🧺</div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Harvest Basket</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Take home fresh produce</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Experiences Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">Signature Experiences</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Curated moments designed to nourish body, mind, and spirit in harmony with nature.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src="bed.jpeg" 
                  alt="Wellness & Restoration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4">Wellness & Restoration</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Our spa sanctuary offers indigenous healing rituals, therapeutic massages, and meditation sessions guided by the sounds of the forest. Each treatment uses organic botanicals harvested from our gardens.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Forest Bathing Ceremonies</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Therapeutic Massage Treatments</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Sunrise Yoga & Meditation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src="dinner.jpeg" 
                  alt="Farm-to-Table Dining"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4">Farm-to-Table Dining</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Our culinary philosophy celebrates local ingredients and sustainable practices. Chef's tasting menus change with the seasons, showcasing the region's finest produce paired with biodynamic wines.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Seasonal Tasting Menus</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Private Canopy Dining</span>
                  </li>
                  <li className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Organic Garden Tours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Guided Nature Walks</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Expert-led forest exploration</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Stargazing Nights</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Astronomy in pristine darkness</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Waterfall Expeditions</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Private access to hidden cascades</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Cultural Immersion</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Local traditions and crafts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Responsive */}
      <section id="contact-section" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#2F6F4F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">Begin Your Journey</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto px-4">
              Reserve your sanctuary. Our concierge team will craft a bespoke experience tailored to your desires.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <a 
              href="https://www.airbnb.co.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-emerald-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <CirclePause className="w-4 h-4 sm:w-5 sm:h-5" />
              Book on Airbnb.com
            </a>
            <a 
              href="https://www.booking.com/index.en.html?aid=2405329;label=brave_brand_0151da16-fea3-4437-9100-d8fddfc2ce5d_dbfcb1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              Book on Booking.com
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6">Get in Touch</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                  <div>
                    <a href="mailto:reservations@kupusiresort.com" className="hover:text-amber-400 transition-colors text-sm sm:text-base break-all">
                      reservations@kupusiresort.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors text-sm sm:text-base">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                  <div className="text-sm sm:text-base">
                    <p>Private Rainforest Reserve</p>
                    <p>Kupusi Valley Region</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-serif mb-3 sm:mb-4">Location Access</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Our resort is accessible via private helicopter transfer from the capital city. Ground transportation can be arranged for a scenic 4-hour journey through mountain passes.
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                  required
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
                />
                
                <textarea
                  name="message"
                  placeholder="Tell us about your ideal retreat..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors resize-none text-sm sm:text-base"
                  required
                ></textarea>
                
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-center text-xs sm:text-sm">
                    Thank you! Your reservation request has been sent successfully. We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center text-xs sm:text-sm">
                    Sorry, there was an error sending your request. Please try again or contact us directly.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting 
                      ? 'bg-amber-600 cursor-not-allowed' 
                      : 'bg-amber-500 hover:bg-amber-600'
                  } text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base`}
                >
                  {isSubmitting ? 'Sending...' : 'Request Reservation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="bg-[#2F6F4F] text-white/70 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs sm:text-sm">
            © 2025 Kupusi Resort & Retreats. All rights reserved. Crafted with care for nature and luxury.
          </p>
        </div>
      </footer>
    </div>
  );
}
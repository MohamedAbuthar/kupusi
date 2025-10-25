"use client"
import React, { useState } from 'react';
import { ChevronDown, Infinity, Star, MapPin, Phone, Mail } from 'lucide-react';

export default function KupusiResort() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-emerald-900 to-emerald-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            Kupusi
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <h2 className="text-xl md:text-2xl text-white font-light">
              Resort & Retreats
            </h2>
            <span className="text-white">•</span>
            <h2 className="text-xl md:text-2xl text-white font-light">
              Farmhouse Stays
            </h2>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Two exceptional properties. One philosophy: luxury in harmony with nature.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
              Reserve Your Stay
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto">
              View Properties
            </button>
          </div>
          
          <div className="text-white/80 text-sm">
            Also available on: 
            <a href="#" className="underline ml-2 hover:text-white">Airbnb</a>
            <span className="mx-2">•</span>
            <a href="#" className="underline hover:text-white">Booking.com</a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* Sanctuary Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                A Sanctuary for the Soul
              </h2>
              <div className="w-20 h-1 bg-amber-500 mb-6"></div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Nestled within untouched rainforest, Kupusi Resort & Retreats offers an unparalleled fusion of luxury and nature. Our philosophy centers on mindful hospitality, where every detail is crafted to restore, rejuvenate, and reconnect you with the earth's natural rhythms.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                With only twelve exclusive villas, we ensure an intimate experience where privacy meets exceptional service, and modern comfort harmonizes with ancient wilderness.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-serif text-emerald-800 mb-2">12</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Exclusive Villas</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-serif text-emerald-800 mb-2">500</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Acres of Wilderness</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Infinity className="w-10 h-10 text-emerald-800 mb-2" />
                <div className="text-sm text-gray-600 uppercase tracking-wider">Moments of Peace</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-6 h-6 text-emerald-800 fill-emerald-800" />
                  <span className="text-3xl font-serif text-emerald-800">5</span>
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Luxury Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Properties Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Properties</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Two distinctive experiences, one philosophy: reconnect with nature in uncompromising comfort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resort & Retreats */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64 bg-gradient-to-br from-emerald-700 to-emerald-900 overflow-hidden">
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  From $850/night
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-serif mb-2">Kupusi Resort & Retreats</h3>
                <div className="text-amber-600 text-sm uppercase tracking-wider mb-4 font-medium">
                  Luxury Wilderness Sanctuary
                </div>
                
                <p className="text-gray-600 mb-6">
                  Experience ultimate luxury in pristine rainforest. Twelve exclusive villas with private pools, world-class spa, and farm-to-table dining.
                </p>
                
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">12 Luxury Villas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Infinity Pools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Spa & Wellness Center</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Fine Dining Restaurant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Guided Nature Walks</span>
                  </li>
                </ul>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-lg font-medium transition-colors">
                    Book Now
                  </button>
                  <button className="flex-1 bg-stone-100 hover:bg-stone-200 text-emerald-900 py-3 rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Farmhouse */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64 bg-gradient-to-br from-amber-600 to-amber-800 overflow-hidden">
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  From $320/night
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-serif mb-2">Kupusi Farmhouse</h3>
                <div className="text-amber-600 text-sm uppercase tracking-wider mb-4 font-medium">
                  Rural Retreat & Organic Farm Stay
                </div>
                
                <p className="text-gray-600 mb-6">
                  Authentic countryside experience on our working organic farm. Rustic luxury meets sustainable living with farm-fresh meals and pastoral tranquility.
                </p>
                
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Farmhouse Accommodations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Organic Farm Tours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Farm-to-Table Meals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Animal Interactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Cooking Workshops</span>
                  </li>
                </ul>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-lg font-medium transition-colors">
                    Book Now
                  </button>
                  <button className="flex-1 bg-stone-100 hover:bg-stone-200 text-emerald-900 py-3 rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Villas Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Luxury Villas</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each villa is a masterpiece of sustainable architecture, seamlessly integrated into the natural landscape.
            </p>
          </div>

          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <div className="h-96 bg-gradient-to-br from-emerald-600 to-emerald-900"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-serif mb-4">Forest Canopy Villa</h3>
              <p className="text-gray-600 mb-6">
                Suspended among ancient trees with panoramic rainforest views and private infinity pool.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">King Bed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Private Pool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Forest Views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Outdoor Shower</span>
                </li>
              </ul>
              <button className="w-full bg-stone-100 hover:bg-stone-200 text-emerald-900 py-3 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-serif mb-4">Valley Mist Villa</h3>
              <p className="text-gray-600 mb-6">
                Perched on a hillside overlooking misty valleys, with floor-to-ceiling windows.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">King Bed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Valley Views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Spa Bath</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Private Terrace</span>
                </li>
              </ul>
              <button className="w-full bg-stone-100 hover:bg-stone-200 text-emerald-900 py-3 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-serif mb-4">River Stone Villa</h3>
              <p className="text-gray-600 mb-6">
                Riverside sanctuary with natural stone features and soothing water sounds.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">King Bed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">River Views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Stone Bath</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">Meditation Deck</span>
                </li>
              </ul>
              <button className="w-full bg-stone-100 hover:bg-stone-200 text-emerald-900 py-3 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Farmhouse Living Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-xl h-96 bg-gradient-to-br from-amber-300 to-amber-600"></div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Farmhouse Living</h2>
              <div className="w-20 h-1 bg-amber-500 mb-6"></div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Our farmhouse offers a slower pace of life, where you can reconnect with the land and experience the rhythms of rural living. Wake to rooster calls, enjoy meals made from ingredients picked steps from your door, and fall asleep to the sounds of nature.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                The renovated 19th-century farmhouse features four guest rooms, each with period furnishings, modern amenities, and views of rolling pastures and gardens. Shared spaces include a farmhouse kitchen, cozy library, and wraparound porch perfect for evening relaxation.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-serif text-center mb-8">Farm Activities</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-stone-50 p-6 rounded-lg">
                <h4 className="text-xl font-serif mb-3">Morning Farm Rituals</h4>
                <p className="text-gray-600">
                  Start your day collecting fresh eggs, feeding heritage chickens, and harvesting vegetables for breakfast.
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg">
                <h4 className="text-xl font-serif mb-3">Artisan Cheese Making</h4>
                <p className="text-gray-600">
                  Learn traditional cheese-making techniques using milk from our dairy herd.
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg">
                <h4 className="text-xl font-serif mb-3">Organic Garden Tours</h4>
                <p className="text-gray-600">
                  Explore our permaculture gardens and discover sustainable farming practices.
                </p>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-lg">
                <h4 className="text-xl font-serif mb-3">Sunset Hayrides</h4>
                <p className="text-gray-600">
                  Enjoy scenic countryside views on our vintage tractor-drawn wagon.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-100 rounded-2xl p-12">
            <h3 className="text-2xl font-serif text-center mb-8">What's Included</h3>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🥚</div>
                <h4 className="font-semibold mb-2">Farm Breakfast</h4>
                <p className="text-gray-600 text-sm">Fresh eggs, bread & preserves</p>
              </div>
              
              <div>
                <div className="text-5xl mb-4">🌾</div>
                <h4 className="font-semibold mb-2">Daily Activities</h4>
                <p className="text-gray-600 text-sm">Guided farm tours & workshops</p>
              </div>
              
              <div>
                <div className="text-5xl mb-4">🧺</div>
                <h4 className="font-semibold mb-2">Harvest Basket</h4>
                <p className="text-gray-600 text-sm">Take home fresh produce</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Experiences Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Signature Experiences</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated moments designed to nourish body, mind, and spirit in harmony with nature.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-emerald-600 to-emerald-800"></div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4">Wellness & Restoration</h3>
                <p className="text-gray-600 mb-6">
                  Our spa sanctuary offers indigenous healing rituals, therapeutic massages, and meditation sessions guided by the sounds of the forest. Each treatment uses organic botanicals harvested from our gardens.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Forest Bathing Ceremonies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Therapeutic Massage Treatments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Sunrise Yoga & Meditation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-amber-600 to-amber-800"></div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4">Farm-to-Table Dining</h3>
                <p className="text-gray-600 mb-6">
                  Our culinary philosophy celebrates local ingredients and sustainable practices. Chef's tasting menus change with the seasons, showcasing the region's finest produce paired with biodynamic wines.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Seasonal Tasting Menus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Private Canopy Dining</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-gray-700">Organic Garden Tours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-2">Guided Nature Walks</h4>
              <p className="text-gray-600 text-sm">Expert-led forest exploration</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-2">Stargazing Nights</h4>
              <p className="text-gray-600 text-sm">Astronomy in pristine darkness</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-2">Waterfall Expeditions</h4>
              <p className="text-gray-600 text-sm">Private access to hidden cascades</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="font-semibold mb-2">Cultural Immersion</h4>
              <p className="text-gray-600 text-sm">Local traditions and crafts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Begin Your Journey</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-white/90 max-w-2xl mx-auto">
              Reserve your sanctuary. Our concierge team will craft a bespoke experience tailored to your desires.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="bg-white text-emerald-900 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
              <span>📍</span> Book on Airbnb
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <span>📋</span> Book on Booking.com
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif mb-6">Get in Touch</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <a href="mailto:reservations@kupusiresort.com" className="hover:text-amber-400 transition-colors">
                      reservations@kupusiresort.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p>Private Rainforest Reserve</p>
                    <p>Kupusi Valley Region</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-serif mb-4">Location Access</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our resort is accessible via private helicopter transfer from the capital city. Ground transportation can be arranged for a scenic 4-hour journey through mountain passes.
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors"
                />
                
                <textarea
                  name="message"
                  placeholder="Tell us about your ideal retreat..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-emerald-800/50 border border-emerald-700 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Request Reservation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white/70 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © 2025 Kupusi Resort & Retreats. All rights reserved. Crafted with care for nature and luxury.
          </p>
        </div>
      </footer>
    </div>
  );
}
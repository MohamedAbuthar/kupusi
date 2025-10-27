"use client"
import React, { useState, useEffect } from 'react';
import { 
  addProperty, 
  getProperties, 
  updateProperty, 
  deleteProperty, 
  type Property 
} from '@/firebase/firestore';

export default function AdminPanel() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'resort' as Property['type'],
    description: '',
    detailedDescription: '',
    price: 0,
    priceUnit: 'night',
    images: [''],
    amenities: [''],
    location: '',
    size: '',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    villaType: 'forest-canopy' as 'forest-canopy' | 'valley-mist' | 'river-stone',
    view: '',
    pool: false,
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const result = await getProperties();
    if (result.success) {
      setProperties(result.data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ''),
        amenities: formData.amenities.filter(amenity => amenity.trim() !== ''),
      };

      if (editingProperty?.id) {
        await updateProperty(editingProperty.id, propertyData);
      } else {
        await addProperty(propertyData);
      }

      await loadProperties();
      resetForm();
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'resort',
      description: '',
      detailedDescription: '',
      price: 0,
      priceUnit: 'night',
      images: [''],
      amenities: [''],
      location: '',
      size: '',
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      featured: false,
      villaType: 'forest-canopy',
      view: '',
      pool: false,
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  const editProperty = (property: Property) => {
    setFormData({
      title: property.title,
      type: property.type,
      description: property.description,
      detailedDescription: property.detailedDescription,
      price: property.price,
      priceUnit: property.priceUnit,
      images: property.images.length > 0 ? property.images : [''],
      amenities: property.amenities.length > 0 ? property.amenities : [''],
      location: property.location,
      size: property.size,
      capacity: property.capacity,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      featured: property.featured,
      villaType: property.villaType || 'forest-canopy',
      view: property.view || '',
      pool: property.pool || false,
    });
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id);
      await loadProperties();
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const addAmenityField = () => {
    setFormData({ ...formData, amenities: [...formData.amenities, ''] });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const updateAmenity = (index: number, value: string) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData({ ...formData, amenities: newAmenities });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Property Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          {showForm ? 'Cancel' : 'Add New Property'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Property Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Property['type'] })}
              className="p-2 border rounded"
            >
              <option value="resort">Resort</option>
              <option value="farmhouse">Farmhouse</option>
              <option value="villa">Villa</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="p-2 border rounded"
              required
            />
          </div>

          <textarea
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded mb-4"
            rows={3}
            required
          />

          <textarea
            placeholder="Detailed Description"
            value={formData.detailedDescription}
            onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
            className="w-full p-2 border rounded mb-4"
            rows={5}
            required
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Images URLs</label>
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="url"
                placeholder={`Image URL ${index + 1}`}
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <button type="button" onClick={addImageField} className="text-emerald-600">
              + Add Image
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Amenities</label>
            {formData.amenities.map((amenity, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Amenity ${index + 1}`}
                value={amenity}
                onChange={(e) => updateAmenity(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <button type="button" onClick={addAmenityField} className="text-emerald-600">
              + Add Amenity
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingProperty ? 'Update Property' : 'Add Property'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {property.images[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.type}</p>
              <p className="text-emerald-600 font-semibold">
                ${property.price}/{property.priceUnit}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => editProperty(property)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => property.id && handleDelete(property.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
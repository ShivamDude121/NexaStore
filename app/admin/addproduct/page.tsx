"use client"
import React, { useState, ChangeEvent } from 'react';
import { ShoppingBag, Upload, X, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useSession } from "next-auth/react";

import { useEffect } from "react";


interface FormData {
  name: string;
  description: string;
  cost: string;
  warranty: number;
  stock: string;
  images: string[];
}

interface FormErrors {
  name?: string;
  description?: string;
  cost?: string;
  stock?: string;
}

const AddProductPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  //@ts-ignore
  const id = session?.user?.id;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    cost: '',
    warranty: 0,
    stock: '',
    images: []
  });
  
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name in errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleImageUrlChange = (index: number, value: string) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
    setFormData({ ...formData, images: updatedUrls.filter(url => url.trim() !== '') });
  };
  
  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };
  
  const removeImageUrlField = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    setFormData({ ...formData, images: updatedUrls.filter(url => url.trim() !== '') });
  };
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be 0 or greater';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Filter out empty image URLs
      const productData = {
        ...formData,
        images: formData.images.filter(url => url.trim() !== ''),
        cost: parseFloat(formData.cost),
        stock: parseInt(formData.stock),
        warranty: formData.warranty
      };
      
      // Replace with your actual API endpoint
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(productData)
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to create product');
      // }
      
      // Mock API call - replace with actual implementation
     // console.log('Product to be created:', productData);
      
      // Simulate API delay
      const { status }=await axios.post('/api/addproduct',{...productData,id})  
      //await new Promise(resolve => setTimeout(resolve, 2000));
      if(status==200){
      alert('Product created successfully!');
      router.push("/admin/dashboard");
    } else {
      alert('Error creating product. Please try again.');
    }
    
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        cost: '',
        warranty: 0,
        stock: '',
        images: []
      });
      setImageUrls(['']);
      setErrors({});
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <ShoppingBag className="h-12 w-12 text-indigo-600" />
            <span className="ml-2 text-3xl font-bold text-gray-900">NexaStore</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Add New Product
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to add a new product to your store
          </p>
        </div>
        
        {/* Back Button */}
        <button  onClick={()=>router.push("/admin/dashboard")} className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
        
        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                  Cost ($) *
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  min="0"
                  step="0.01"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.cost ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
              </div>
              
              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
              </div>
            </div>
            
            {/* Warranty */}
            <div>
              <label htmlFor="warranty" className="block text-sm font-medium text-gray-700 mb-2">
                Warranty (months)
              </label>
              <input
                type="number"
                id="warranty"
                name="warranty"
                min="0"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter warranty period in months"
              />
            </div>
            
            {/* Image URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="space-y-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrlField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrlField}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add another image URL
                </button>
              </div>
            </div>
            
            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image Preview
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          e.currentTarget.src = '/api/placeholder/150/150';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Product...
                  </div>
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
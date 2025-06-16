'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Package, MapPin, User, DollarSign, Loader2 } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

// Types
type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetails {
  id: string;
  userName: string;
  price: number;
  productImage: string;
  productName: string;
  address: Address;
  status: OrderStatus;
  createdAt: string;
}

const OrderDetailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const statusOptions: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  };

  // Mock data for demonstration
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrder: OrderDetails = {
          id: orderId as string || 'ORD-001',
          userName: 'John Doe',
          price: 299.99,
          productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
          productName: 'Premium Wireless Headphones',
          address: {
            id: 'addr-001',
            userId: 'user-001',
            street: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            country: 'United States',
            postalCode: '10001',
            isDefault: true,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          status: 'PROCESSING',
          createdAt: '2024-01-15T10:30:00Z'
        };

        const response=await axios.get(`/api/get_order_id?orderId=${orderId}`);
        const userId=response.data.order.userId;
        const user=await axios.get(`/api/get_user_id?userId=${userId}`);
        const add_id=response.data.order.addressId;
        const address=await axios.get(`/api/get_address_id?addressId=${add_id}`);
        
        const product_id=response.data.order.productId;
        const product=await axios.get(`/api/curr_product?id=${product_id}`);
        //  console.log(response.data.order);
        // console.log(user.data.client);
        // console.log(address.data.address);
        // console.log(product.data.product);

        const x={
            id:orderId as string,
            userName:user.data.client.firstName+" "+user.data.client.lastName,
            price:response.data.order.totalAmount,
            productImage:product.data.product.images[0],
            productName:product.data.product.name,
            address:address.data.address,
            status:response.data.order.status,
            createdAt:response.data.order.createdAt,
        }

        
        setOrder(x);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    
    setStatusLoading(true);
    try {
      // Simulate API call to update order status
    //   const response = await fetch(`/api/orders/${order.id}/status`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ status: newStatus }),
    //   });

    const response=await axios.patch(`/api/update_order_status?orderId=${orderId}`,{status:newStatus});
    console.log(response.data);

  //  await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(newStatus);

      if (response.status===200) {
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
        setIsSliderOpen(false);
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-xl text-gray-600">Loading order details...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <button
            onClick={handleBack}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Order <span className="text-indigo-600">#{order.id}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Info */}
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              
              <button
                onClick={() => setIsSliderOpen(true)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Change Status
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-6 w-6 mr-2 text-indigo-600" />
                Customer Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg text-gray-900">{order.userName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Date</label>
                  <p className="text-lg text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-indigo-600" />
                Order Total
              </h2>
              <div className="text-3xl font-bold text-indigo-600">
                ${order.price}
              </div>
            </div>
          </div>

          {/* Right Column - Product & Address */}
          <div className="space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Package className="h-6 w-6 mr-2 text-indigo-600" />
                Product Details
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={order.productImage}
                    alt={order.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{order.productName}</h3>
                  <p className="text-indigo-600 font-bold text-xl">${order.price}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-indigo-600" />
                Delivery Address
              </h2>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
                <p>{order.address.country}</p>
                {order.address.isDefault && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Default Address
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Slider */}
      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Order Status</h3>
              <button
                onClick={() => setIsSliderOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={statusLoading || status === order.status}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    status === order.status
                      ? 'bg-indigo-100 text-indigo-800 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{status}</span>
                    {status === order.status && (
                      <span className="text-sm text-indigo-600">Current</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {statusLoading && (
              <div className="mt-4 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600 mr-2" />
                <span className="text-indigo-600">Updating status...</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderDetailPage;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ShoppingBag, 
  LayoutDashboard, 
  User, 
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin
} from 'lucide-react';      
import Image from 'next/image'; 
import { useSession } from 'next-auth/react';
import axios from 'axios';

// Types
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface Order {
  id: string;
  productId: string;
  userId: string;
  adminId: string;
  addressId: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  quantity: number;
  priceAtOrder: number;
  totalAmount: number;
  orderedAt: string;
  product: Product;
  address: Address;
}

// Mock data - replace with actual API call
const mockOrders: Order[] = [
  {
    id: '1',
    productId: 'prod_1',
    userId: 'user_1',
    adminId: 'admin_1',
    addressId: 'addr_1',
    status: 'DELIVERED',
    paymentStatus: 'COMPLETED',
    quantity: 1,
    priceAtOrder: 149.99,
    totalAmount: 149.99,
    orderedAt: '2024-06-01',
    product: {
      id: 'prod_1',
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      price: 149.99
    },
    address: {
      id: 'addr_1',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      isDefault: true
    }
  },
  {
    id: '2',
    productId: 'prod_2',
    userId: 'user_1',
    adminId: 'admin_1',
    addressId: 'addr_2',
    status: 'SHIPPED',
    paymentStatus: 'COMPLETED',
    quantity: 1,
    priceAtOrder: 89.99,
    totalAmount: 89.99,
    orderedAt: '2024-06-05',
    product: {
      id: 'prod_2',
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      price: 89.99
    },
    address: {
      id: 'addr_2',
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90210',
      isDefault: false
    }
  }
];

const OrderHistoryPage: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  //@ts-ignore
  const clientId = session?.user?.id;

  const getOrders = async () => {

    setLoading(true);

    try{
    const orders = await axios.get(`/api/get_order`,{
      params: {
        clientId: clientId
      }
    });

    const data = await Promise.all(
      orders.data.orders.map(async (order: any) => {
        const [pro, add] = await Promise.all([
          axios.get(`/api/curr_product`, {
            params: { id: order.productId },
          }),
          axios.get(`/api/get_add_id`, {
            params: { id: order.addressId },
          }),
        ]);
    
        const prod: Product = {
          id: pro.data.product.id,
          name: pro.data.product.name,
          image: pro.data.product.images[0],
          price: pro.data.product.cost,
        };
    
        const adder: Address = {
          id: add.data.address.id,
          street: add.data.address.street,
          city: add.data.address.city,
          state: add.data.address.state,
          country: add.data.address.country,
          postalCode: add.data.address.postalCode,
          isDefault: add.data.address.isDefault,
        };
    
        return {
          id: order.id,
          productId: order.productId,
          userId: order.userId,
          adminId: order.adminId,
          addressId: order.addressId,
          status: order.status,
          paymentStatus: order.paymentStatus,
          quantity: order.quantity,
          priceAtOrder: order.priceAtOrder,
          totalAmount: order.totalAmount,
          orderedAt: order.orderedAt,
          product: prod,
          address: adder,
        };
      })
    );
    setOrders(data);
    setLoading(false);
    

  }
  catch(error){
    console.log(error);
    setLoading(false);
  }
  }

  useEffect(() => {
    //@ts-ignore
    const clientId = session?.user?.id;
    if(clientId!==undefined){

      getOrders();
    
    }
    
  }, [session]);


  // Simulate API call
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     setLoading(true);
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1500));
  //     setOrders(mockOrders);
  //     setLoading(false);
  //   };

  //   fetchOrders();
  // }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'PROCESSING':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'SHIPPED':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'DELIVERED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-orange-100 text-orange-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-violet-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/user/dashboard')}
                className="p-2 rounded-lg text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard className="h-6 w-6" />
              </button>
              <button
                onClick={() => router.push('/user/profile')}
                className="p-2 rounded-lg text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                title="Profile"
              >
                <User className="h-6 w-6" />
              </button>
              <button
                onClick={() => router.push('/user/cart')}
                className="p-2 rounded-lg text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                title="Cart"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">Track and manage your previous orders</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.orderedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2 capitalize">{order.status}</span>
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={order.product.image}
                        alt={order.product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-medium text-gray-900 truncate">
                        {order.product.name}
                      </h4>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Quantity: {order.quantity}</span>
                        <span>Price: ${order.priceAtOrder}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                            ${order.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Delivery Address
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatAddress(order.address)}
                      </p>
                      {order.address.isDefault && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-violet-100 text-violet-800 mt-1">
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-8 w-8 text-violet-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
              </div>
              <p className="text-gray-600 max-w-md">
                Your trusted online marketplace for quality products at competitive prices. 
                Shop with confidence and enjoy fast, reliable delivery.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 NexaStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderHistoryPage;
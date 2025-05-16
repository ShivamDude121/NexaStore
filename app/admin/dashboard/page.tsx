'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Eye, DollarSign, Package, Users, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}
interface AdminInfo {
   id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AdminDashboard = () => {
    const router = useRouter();
  const [showOrders, setShowOrders] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
      id:"",
      firstName: "",
      lastName: "",
      email: ""
    });

    useEffect(() => {
        setAdminInfo({
            //@ts-ignore            
            id:session.data?.user?.id||"",
            //@ts-ignore
            firstName:session.data?.user?.firstname||"",
            //@ts-ignore
            lastName:session.data?.user?.lastname||"",
            //@ts-ignore
            email:session.data?.user?.email||""
        })
       // console.log(session.data?.user)
    },[session])

    

    


  
  // Mock admin data
  
  // Mock user data
  const userBalance = 2450.75;
  
  // Fetch products from backend - Replace this with your actual API call
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Replace with your actual API endpoint
//         // const response = await fetch('/api/products');
//         // const data = await response.json();
//         // setProducts(data);
        
//         // Mock data for demonstration
//         setTimeout(() => {
//           setProducts([
//             { id: 1, name: "Smartphone", price: 599.99, stock: 25, image: '/api/placeholder/300/200' },
//             { id: 2, name: "Laptop", price: 1299.99, stock: 10, image: '/api/placeholder/300/200' },
//             { id: 3, name: "Headphones", price: 199.99, stock: 50, image: '/api/placeholder/300/200' },
//             { id: 4, name: "Tablet", price: 449.99, stock: 15, image: '/api/placeholder/300/200' },
//           ]);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, []);
  
  // Mock orders data
  const orders = [
    { id: "ORD001", customer: "Alice Smith", product: "Smartphone", amount: 599.99, status: "Completed" },
    { id: "ORD002", customer: "Bob Johnson", product: "Laptop", amount: 1299.99, status: "Pending" },
    { id: "ORD003", customer: "Carol Wilson", product: "Headphones", amount: 199.99, status: "Shipped" },
  ];
  
  if (showOrders) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header for Orders Page */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center">
              <ShoppingBag className="h-12 w-12 text-indigo-600" />
              <span className="ml-2 text-3xl font-bold text-gray-900">NexaStore</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Order Management
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all customer orders
            </p>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={() => setShowOrders(false)}
            className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            ← Back to Dashboard
          </button>
          
          {/* Orders Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Customer Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="flex justify-center items-center">
            <ShoppingBag className="h-12 w-12 text-indigo-600" />
            <span className="ml-2 text-3xl font-bold text-gray-900">NexaStore</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your store and track performance
          </p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="absolute top-0 right-0 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2 text-gray-600" />
            Logout
          </button>
        </div>
        
        {/* Admin Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {adminInfo.firstName} {adminInfo.lastName}
              </h3>
              <p className="text-gray-600">{adminInfo.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* User Balance Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <DollarSign className="h-12 w-12 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">User Balance</h3>
                <p className="text-3xl font-bold text-green-600">${userBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Products Stats Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <Package className="h-12 w-12 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </div>
            </div>
          </div>
          
          {/* Actions Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              {/* Add Product Button */}
              <button onClick={()=>router.push("/admin/addproduct")} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </button>
              
              {/* View Orders Button */}
              <button 
                onClick={() => setShowOrders(true)}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Orders
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Your Products</h3>
            {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button> */}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                  <div className="bg-gray-300 h-48"></div>
                  <div className="p-6">
                    <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300 h-8 w-1/3"></div>
                      <div className="flex space-x-2">
                        <div className="bg-gray-300 h-6 w-12"></div>
                        <div className="bg-gray-300 h-6 w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={product.image || `/api/placeholder/300/200`} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 20 ? 'bg-green-100 text-green-800' :
                        product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 20 ? 'In Stock' : product.stock > 10 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">Available Stock: {product.stock} units</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors duration-200">
                          Edit
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors duration-200">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
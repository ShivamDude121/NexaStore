"use client"
import { useRouter } from "next/navigation";
import React from 'react';
import { ShoppingBag, Star, Shield, Truck, Headphones } from 'lucide-react';

export default function NexaStoreLanding() {

  const router = useRouter();
  const handleLogin = () => {
    // Navigate to login page
    router.push('/login');
  };

  const handleSignUp = () => {
    // Navigate to signup page
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Home
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Products
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                About
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-indigo-600">NexaStore</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing products, unbeatable prices, and exceptional service. 
              Your one-stop destination for all your shopping needs.
            </p>
            
            {/* Auth Cards */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
              {/* Login Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600 mb-6">Sign in to your account</p>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Log In
                  </button>
                </div>
              </div>

              {/* Signup Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Join NexaStore</h2>
                  <p className="text-gray-600 mb-6">Create your account today</p>
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose NexaStore?</h2>
            <p className="text-xl text-gray-600">We're committed to providing you with the best shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Shopping</h3>
              <p className="text-gray-600">Your data is protected with industry-leading security measures</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our reliable shipping</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our team is here to help you whenever you need assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <ShoppingBag className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-2xl font-bold">NexaStore</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-4">Your premier shopping destination</p>
              <div className="flex space-x-6">
                <button className="text-gray-400 hover:text-white">Privacy Policy</button>
                <button className="text-gray-400 hover:text-white">Terms & Conditions</button>
                <button className="text-gray-400 hover:text-white">Support</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 NexaStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
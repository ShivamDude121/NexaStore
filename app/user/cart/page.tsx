'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, MapPin, CreditCard, CheckCircle, Loader, Package, ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter, useSearchParams } from 'next/navigation';

// Define types for cart items and addresses
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface Address {
  id: number;
  label: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  isDefault: boolean;
}

const ShoppingCartPage = () => {

  const router=useRouter();

    const { data: session, status } = useSession();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Simulate backend API calls with more realistic data
  useEffect(() => {
    const fetchCartData = async () => {
      // Simulate API delay
      //await new Promise(resolve => setTimeout(resolve, 1200));

      const cartItems = await axios.get("/api/get_cart_items",{
        params: {
          //@ts-ignore
          clientId:session?.user?.id
        }
      });

      //console.log(cartItems.data.cartItems);

      //axios.get('/api/curr_product',{params:{id:id}})

      const items: CartItem[] = await Promise.all(
        cartItems.data.cartItems.map(async (item: any) => {
          const product = await axios.get('/api/curr_product', {
            params: { id: item.productId },
          });
      
          return {
            id: product.data.product.id,
            name: product.data.product.name,
            price: product.data.product.cost,
            quantity: item.quantity,
            image: product.data.product.images[0],
          };
        })
      );

      setCartItems(items);
      

      
      
      

      const addresses=await axios.get('/api/get_address',{
        params: {
           //@ts-ignore
           clientId:session?.user?.id
        }});

        //console.log(addresses.data.addresses);

        if(addresses.data.addresses.length>0){
          const address=addresses.data.addresses;
          const add:Address[]=address.map((item:any)=> {
            return{

              id: item.id,
               label: item.postalCode,
                name: item.city,
              address: item.street,
               city: item.state,
               //phone: string;
              isDefault: item.isDefault
             
            }
          })


          setAddresses(add);
          setSelectedAddress(add[0]);

        }  
     

      setLoading(false);
    };

    fetchCartData();
  }, [session]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev: CartItem[]) => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev: CartItem[]) => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShipping = () => getSubtotal() > 100 ? 0 : 9.99;
  const getTax = () => getSubtotal() * 0.0875; // 8.75% tax
  const getTotal = () => getSubtotal() + getShipping() + getTax();

  const handlePlaceOrder = async () => {
   
    // Simulate backend API call




    console.log(cartItems);
    console.log(selectedAddress);

    try{

      setOrderModal(true);
      setOrderLoading(true);
      setOrderSuccess(false);
  
      const order=await axios.post('/api/place_order',{
        //@ts-ignore
        clientId:session?.user?.id,
        cartItems:cartItems,
        selectedAddress:selectedAddress

                
      })

      setOrderLoading(false);
      setOrderSuccess(true);

      // Auto close modal after success and reset cart
    setTimeout(() => {
      setOrderModal(false);
      setOrderSuccess(false);
      setCartItems([]);
    }, 3500);
 

    }
    catch{

      alert("unable to place order");
      setOrderLoading(false);

      setOrderModal(false);
      setOrderSuccess(false);
    




    }

    


    await new Promise(resolve => setTimeout(resolve, 2500));
    
   

     };

  const closeModal = () => {
    if (!orderLoading) {
      setOrderModal(false);
      setOrderSuccess(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => router.back()}
                  className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
              </div>
              <div className="flex space-x-4">
                <button  onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Home</button>
                <button   onClick={()=>router.push('/user/dashboard')}className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Products</button>
                <button  onClick={()=>router.push('/user/dashboard')}   className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">About</button>
                <button  onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Contact</button>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="flex flex-col justify-center items-center h-96">
          <Loader className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
            </div>
            <div className="flex space-x-4">
              <button   onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Home</button>
              <button  onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Products</button>
              <button  onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">About</button>
              <button  onClick={()=>router.push('/user/dashboard')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your items and complete your purchase</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-indigo-600" />
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNUM0My4zMTM3IDI1IDQ2IDI3LjY4NjMgNDYgMzFWMzVIMzRWMzFDMzQgMjcuNjg2MyAzNi42ODYzIDI1IDQwIDI1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjggMzNIMTRWNTVINjZWMzNINTJWMzVINDZWMzNIMzRWMzVIMjhWMzNaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                          <p className="text-indigo-600 font-semibold">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors text-gray-600 hover:text-gray-800"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors text-gray-600 hover:text-gray-800"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-xl font-bold text-gray-900 mb-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Address */}
            <div className="space-y-6">
              {/* Address Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="h-6 w-6 text-indigo-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label key={address.id} className="block cursor-pointer">
                      <div className={`p-4 border-2 rounded-lg transition-all ${
                        selectedAddress?.id === address.id 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selectedAddress?.id === address.id}
                            onChange={(e) => setSelectedAddress(address)}
                            className="mt-1 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-semibold text-gray-900">{address.label}</span>
                              {address.isDefault && (
                                <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-900 font-medium">{address.name}</p>
                            <p className="text-gray-600 text-sm">{address.address}</p>
                            <p className="text-gray-600 text-sm">{address.city}</p>
                            <p className="text-gray-500 text-sm">{address.phone}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {getShipping() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${getShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {getShipping() !== 0 && (
                    <p className="text-sm text-gray-500">Free shipping on orders over $100</p>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">${getTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddress || cartItems.length === 0}
                  className="w-full mt-6 bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Place Order • ${getTotal().toFixed(2)}
                </button>
                
                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Order Modal */}
      {orderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
            {orderLoading ? (
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Loader className="h-10 w-10 animate-spin text-indigo-600" />
                  </div>
                  <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-20"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Processing Your Order</h3>
                <p className="text-gray-600 mb-4">Please wait while we confirm your purchase...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            ) : orderSuccess ? (
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-40"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Placed Successfully!</h3>
                <p className="text-gray-600 mb-4">Thank you for your purchase. You will receive a confirmation email shortly.</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Order Total: <span className="font-semibold text-gray-900">${getTotal().toFixed(2)}</span></p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
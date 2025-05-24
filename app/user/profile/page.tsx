'use client'
import { useState, ChangeEvent, useEffect } from 'react';
import { User, Mail, MapPin, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserData {
  name: string;
  email: string;
  photo: string;
  addresses: Address[];
}



// Mock user data
const mockUser: UserData = {
  name: "",
  email: "",
  photo: "",
  addresses: []
};

export default function ProfilePage() {
  // Add loading state
const [isLoading, setIsLoading] = useState(true);
  async function getAddresses(){
    setIsLoading(true);
    try{
      const response=await axios.get('/api/get_address',{
      params: {
         //@ts-ignore
         clientId:  session.data?.user?.id ,
      }});
      setUser({
        //@ts-ignore
        name:` ${session.data?.user?.firstname || ""} ${session.data?.user?.lastname || ""} `,
        email: session.data?.user?.email || "",
        photo: session.data?.user?.image || "",
        addresses: response.data.addresses
      });
    }
    catch(error){
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const router = useRouter();
  const session = useSession();
  //console.log(session.data?.user);
  
  const [user, setUser] = useState<UserData>(mockUser);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    isDefault: false
  });

  useEffect(() => {
    setUser({
      //@ts-ignore
      name:` ${session.data?.user?.firstname || ""} ${session.data?.user?.lastname || ""} `,
      email: session.data?.user?.email || "",
      photo: session.data?.user?.image || "",
      addresses: []
    });

    getAddresses();
  }, [session]);
  
  const handleAddressSubmit = async () => {
    // Validate required fields
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.postalCode) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Add the new address to user's addresses
    // const updatedAddresses = [...user.addresses, {
    //   id: `temp-${Date.now()}`,
    //   userId: session.data?.user?.email || "user1", // Using email as userId since id is not available
    //   ...newAddress,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }];
    
    // // If new address is set as default, update other addresses
    // if (newAddress.isDefault) {
    //   updatedAddresses.forEach(address => {
    //     if (address.id !== updatedAddresses[updatedAddresses.length - 1].id) {
    //       address.isDefault = false;
    //     }
    //   });
    // }
    
    // Update user state
    // setUser({
    //   ...user,
    //   addresses: updatedAddresses
    // });

    try {
      const response = await axios.post('/api/add_address', {
        ...newAddress,
        //@ts-ignore
        clientId:  session.data?.user?.id ,
      });
      

      if(response.status===200){
      alert('Address added successfully');
      
      router.push('/user/profile');
      }
    } catch (error) {
      alert('Error submitting address:', );
    }
    // Reset form
    setNewAddress({
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: false
    });
    setShowAddressForm(false);
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? target.checked : value
    });
  };
  
  const setDefaultAddress = (addressId: string) => {
    const updatedAddresses = user.addresses.map(address => ({
      ...address,
      isDefault: address.id === addressId
    }));
    
    setUser({
      ...user,
      addresses: updatedAddresses
    });
  };
  
  const removeAddress = (addressId: string) => {
    // Filter out the address to remove
    let updatedAddresses = user.addresses.filter(address => address.id !== addressId);
    
    // If we removed the default address, set a new default if there are any addresses left
    if (user.addresses.find(a => a.id === addressId)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    setUser({
      ...user,
      addresses: updatedAddresses
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button  onClick={()=>router.back()} className="p-2 mr-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NexaStore</span>
            </div>
            <h1 className="ml-6 text-lg font-semibold text-gray-900">My Profile</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6 flex items-center">
            <div className="flex-shrink-0">
              <img src={"/images/user-avatar.png"} alt={user.name} className="h-24 w-24 rounded-full object-cover border-4 border-indigo-50" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <div className="mt-2 flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Address Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">My Addresses</h3>
              {!showAddressForm && (
                <button 
                  onClick={() => setShowAddressForm(true)} 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Address
                </button>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4">
            {/* New Address Form */}
            {showAddressForm && (
              <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Add New Address</h4>
                  <button 
                    onClick={() => setShowAddressForm(false)} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={newAddress.country}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter country"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="isDefault"
                      name="isDefault"
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddressSubmit}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading Skeleton */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((index) => (
                  <div key={index} className="p-4 rounded-md border border-gray-200 animate-pulse">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : user.addresses.length === 0 ? (
              <div className="text-center py-6">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new address.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <div key={address.id} className={`p-4 rounded-md border ${address.isDefault ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{address.street}</span>
                        {address.isDefault && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!address.isDefault && (
                          <button 
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            Set as default
                          </button>
                        )}
                        
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
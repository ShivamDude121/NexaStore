"use client" 
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, ShoppingCart, User, ClipboardList, Tag, LogOut, Menu, X, Router } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ApiProduct {
  id: number;
  name: string;
  cost: number;
  images: string[];
}

// Mock product data
// const products: Product[] = [
//   { id: 1, name: "Premium Wireless Headphones", price: 149.99, image: "/api/placeholder/300/200" },
//   { id: 2, name: "Smart Watch Series 5", price: 299.99, image: "/api/placeholder/300/200" },
//   { id: 3, name: "Ultra HD 4K Monitor", price: 399.99, image: "/api/placeholder/300/200" },
//   { id: 4, name: "Ergonomic Office Chair", price: 249.99, image: "/api/placeholder/300/200" },
//   { id: 5, name: "Wireless Charging Pad", price: 39.99, image: "/api/placeholder/300/200" },
//   { id: 6, name: "Bluetooth Portable Speaker", price: 89.99, image: "/api/placeholder/300/200" },
//   { id: 7, name: "Professional Digital Camera", price: 849.99, image: "/api/placeholder/300/200" },
//   { id: 8, name: "Gaming Mechanical Keyboard", price: 129.99, image: "/api/placeholder/300/200" }
// ];

// Skeleton component for product loading
const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function LandingPage() {
    const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<ApiProduct[]>('http://localhost:3000/api/products');
      setProducts(res.data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.cost,
        image: product.images[0] || '/api/placeholder/300/200' // Fallback image if none provided
      })));
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }

  

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Simulate loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);
    
//     return () => clearTimeout(timer);
//   }, []);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleProductClick = (productId: number): void => {
    // In a real implementation, this would navigate to /product/[productId]
    alert(`Navigating to product page for ID: ${productId}`);
  };
  
  const handleCartClick = () => {
    alert('Navigating to cart page');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg flex flex-col fixed h-full z-20 transition-all duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-violet-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 mt-6">
          <div className="space-y-4">
            <button  onClick={()=>{router.push('/user/profile')}} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors">
              <User className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Profile</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Previous Orders</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Cart</span>
            </button>
            
            <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors">
              <Tag className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Discounts</span>
            </button>
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 mt-auto border-t">
          <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="ml-3 text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Menu button for sidebar */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo for mobile view */}
            <div className="flex items-center md:hidden">
              <ShoppingBag className="h-6 w-6 text-violet-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NexaStore</span>
            </div>
            
            {/* Search Box */}
            <div className="w-full max-w-xl relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Cart Icon */}
            <button 
              className="p-2 text-gray-600 hover:text-violet-600 relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-violet-600 rounded-full">3</span>
            </button>
          </div>
        </header>
        
        {/* Products Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xl font-bold text-violet-600">${product.price}</p>
                      <button 
                        className="p-1 rounded-full text-violet-600 hover:bg-violet-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Added ${product.name} to cart`);
                        }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <ShoppingBag className="h-8 w-8 text-violet-600" />
                  <span className="ml-2 text-2xl font-bold text-gray-900">NexaStore</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your one-stop shop for premium electronics and accessories.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Shipping Info</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Customer Service</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Track Order</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Returns</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Shipping Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-violet-600 text-sm transition-colors">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Stay Updated</h3>
                <p className="mt-4 text-sm text-gray-600">Subscribe to our newsletter for the latest updates and offers.</p>
                <div className="mt-4">
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} NexaStore. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
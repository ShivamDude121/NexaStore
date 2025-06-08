'use client'
import { useState, useEffect } from 'react';
import { ShoppingCart, Minus, Plus, Star, Shield, Home, User, Heart, Search, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  warranty: string;
  images: string[];
  rating: number;
  stock: number;
}

function Header() {
  const router = useRouter();
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-indigo-600">NexaStore</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/user/dashboard" className="text-gray-600 hover:text-gray-900">
              <Home className="h-6 w-6" />
            </Link>
            <Link href="/user/dashboard" className="text-gray-600 hover:text-gray-900">
              <Search className="h-6 w-6" />
            </Link>
            <Link href="/user/cart" className="text-gray-600 hover:text-gray-900">
            <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/user/profile" className="text-gray-600 hover:text-gray-900">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-600">NexaStore</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover amazing products, unbeatable prices, and exceptional service. 
            Your one-stop destination for all your shopping needs.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ProductPage() {

   const { data: session, status } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  //   console.log(id);
  
    const addToCart = async () => {
        setIsAddingToCart(true);
        try{
        const response= await axios.post('/api/add_to_cart',{
            userId:userId,
            productId:product?.id,
            quantity:quantity,
            price:product?.price
        });
        if(response.status===200){
            alert("Product added to cart");
            router.push('/user/dashboard');
        }
        }catch(error){
            alert("Error adding to cart");
        } finally {
            setIsAddingToCart(false);
        }
    };

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('/api/curr_product',{params:{id:id}});
      setProduct({
        
        id:response.data.product.id,
        name:response.data.product.name,
        description:response.data.product.description,
        price:response.data.product.cost,
        warranty:response.data.product.warranty,
        images:response.data.product.images,
        rating:response.data.product.rating||100,
        stock:response.data.product.stock
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ${
                    selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-indigo-600" />
                <p className="ml-2 text-sm text-gray-500">
                  Warranty: {product.warranty}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 text-center border-0 focus:ring-0"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="ml-4 text-sm text-gray-500">
                  {product.stock} available
                </p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={addToCart}
                disabled={isAddingToCart}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

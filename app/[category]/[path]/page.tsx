'use client';

import Link from 'next/link';
import './path.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeartBtn from '../../../components/HeartBtn'

interface ProductType {
  _id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  path: string;
}

const Page = () => {
  const params = useParams();

  const categoryParam = params?.category;
  const pathParam = params?.path;

  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const path = Array.isArray(pathParam) ? pathParam[0] : pathParam;

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category || !path) return;

      try {
        setLoading(true);
        setError('');

        const res = await fetch(`/api/product?category=${category}&path=${path}`);

        if (!res.ok) {
            const errorText = await res.text(); 
            console.error("API Error (Not JSON):", errorText);
            throw new Error(`Server returned ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        } else {
            setError(data.error || "Failed to fetch data");
        }
      } catch (err: any) {
        console.error("Error in fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, path]); 

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  if (!loading && products.length === 0) {
    return <div className="text-center mt-20">No products found in {category}/{path}</div>;
  }

  return (
    <div>
      <div className="">
        <div className="path-txt flex flex-col items-center mb-6">
          <h4 className='title-txt md:text-[3vw] font-bold leading-12 mt-1.5 mb-4 text-center capitalize'>
            {category?.replace(/-/g, ' ')} Collection
          </h4>
        </div>
        <div className="product-sec">
          {products.map((product) => (
            <div className="product-card relative group" key={product._id}>
              
              <HeartBtn product={{
                  _id: product._id,
                  name: product.name,
                  image: product.image,
                  url: product.url 
              }} />

              <div className="img-div relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  fill={true}
                  className='productImage object-cover' 
                />
              </div>
              <div className="product-info">
                <h1 className='product-title'>{product.name}</h1>
                <p className="product-desc line-clamp-2">{product.description}</p>
                
                <Link className='product-btn' href={product.url} target="_blank">
                    Explore at Brand
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page;
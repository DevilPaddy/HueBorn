'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// --- Types ---
interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  url: string;
}

type ProductFormData = Omit<IProduct, '_id'>;

// --- SVG Icon Components ---
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Product Modal Component ---
interface ProductModalProps {
  product: IProduct | null;
  onClose: () => void;
  onSave: (productData: ProductFormData | IProduct) => void;
  isSaving: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave, isSaving }) => {
  const [formData, setFormData] = useState(
    product || { name: '', brand: '', category: '', url: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-semibold">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={isSaving}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {['name', 'brand', 'category', 'url'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === 'url' ? 'Product URL (Cuelink)' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'url' ? 'url' : 'text'}
                  name={field}
                  id={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-black py-2 px-4 rounded-md text-sm font-medium text-white hover:bg-gray-800 flex items-center justify-center"
            >
              {isSaving ? <LoadingSpinner /> : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Products Table Component ---
interface ProductsManagementProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ProductsManagement: React.FC<ProductsManagementProps> = ({ products, onEdit, onDelete, onAdd }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Manage Products</h2>
      <button
        onClick={onAdd}
        className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all"
      >
        <PlusIcon />
        <span>Add New Product</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-scroll">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Brand', 'Category', 'URL', 'Actions'].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{product.brand}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
              <td className="px-6 py-4 text-sm text-blue-600">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {product.url.length > 30 ? `${product.url.substring(0, 30)}...` : product.url}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-right space-x-2">
                <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-800 p-1">
                  <EditIcon />
                </button>
                <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800 p-1">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

// --- Main Admin Page Component ---
export default function AdminPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  // --- Fetch Products ---
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/product/');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Security Check ---
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      fetch('/api/isadmin')
        .then((res) => res.json())
        .then((data) => {
          if (data.isAdmin) {
            setIsAdmin(true);
            fetchProducts();
          } else {
            router.push('/');
          }
        })
        .catch(() => router.push('/'));
    }
  }, [status, router]);

  // --- Modal Handlers ---
  const handleOpenModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // --- CRUD Handlers ---
  const handleSaveProduct = async (productData: ProductFormData | IProduct) => {
    setIsSaving(true);
    try {
      let res;
      if ('_id' in productData) {
        res = await fetch(`/api/product/${productData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        res = await fetch('/api/product/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (res.ok) {
        fetchProducts();
        handleCloseModal();
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // --- Render ---
  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
          <p className="mt-2 text-lg">Checking credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter p-6 md:p-10">
      <main>
        <ProductsManagement
          products={products}
          onAdd={handleOpenModal}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </main>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

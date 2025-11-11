'use client';
import React, { useState, useEffect } from 'react';

// --- Icon Components ---
// Using inline SVGs to avoid installing lucide-react
const EditIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Trash2Icon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Loader2Icon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// --- Main Component ---
export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // State for the "Add Product" form
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    path: '',
    url: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State for the "Edit Product" modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: '',
    path: '',
    url: '',
    image: null as File | null,
  });
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // State for the "Delete Product" modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const categories = ['lineneshirt', 'poloshirt', 'trousers', 'shoes'];
  const paths = ['path1', 'path2', 'path3'];

  // --- Data Fetching ---
  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/product');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        showNotification(data.error || 'Failed to fetch products.', 'error');
      }
    } catch (error) {
      showNotification('Server error while fetching products.', 'error');
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- Utility Functions ---
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const clearForm = () => {
    setForm({
      name: '',
      description: '',
      category: '',
      path: '',
      url: '',
      image: null,
    });
    setImagePreview(null);
  };

  // --- "Add Product" Handlers ---
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) {
      showNotification('Image is required.', 'error');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('path', form.path);
      formData.append('url', form.url);
      formData.append('file', form.image);

      const res = await fetch('/api/product', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Product added successfully!', 'success');
        clearForm();
        fetchProducts(); // Refresh the list
      } else {
        showNotification(data.error || 'Upload failed.', 'error');
      }
    } catch (error) {
      console.error(error);
      showNotification('Server error.', 'error');
    }

    setLoading(false);
  };

  // --- "Edit Product" Handlers ---
  const openEditModal = (product: any) => {
    setCurrentProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      category: product.category,
      path: product.path,
      url: product.url,
      image: null, // Reset image field
    });
    setEditImagePreview(product.image); // Show existing image
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditForm((prev) => ({ ...prev, image: file }));
    if (file) {
      setEditImagePreview(URL.createObjectURL(file));
    } else {
      setEditImagePreview(currentProduct?.image || null); // Revert to original if cancelled
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      // Only append fields that have changed
      if (editForm.name !== currentProduct.name)
        formData.append('name', editForm.name);
      if (editForm.description !== currentProduct.description)
        formData.append('description', editForm.description);
      if (editForm.category !== currentProduct.category)
        formData.append('category', editForm.category);
      if (editForm.path !== currentProduct.path)
        formData.append('path', editForm.path);
      if (editForm.url !== currentProduct.url)
        formData.append('url', editForm.url);
      if (editForm.image)
        formData.append('file', editForm.image);

      // Check if any data is being sent
      if (Array.from(formData.entries()).length === 0) {
        showNotification('No changes detected.', 'success');
        setIsEditModalOpen(false);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/product/${currentProduct._id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Product updated successfully!', 'success');
        setIsEditModalOpen(false);
        fetchProducts(); // Refresh the list
      } else {
        showNotification(data.error || 'Update failed.', 'error');
      }
    } catch (error) {
      console.error(error);
      showNotification('Server error.', 'error');
    }

    setLoading(false);
  };

  // --- "Delete Product" Handlers ---
  const openDeleteModal = (product: any) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/product/${productToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Product deleted successfully!', 'success');
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts(); // Refresh the list
      } else {
        showNotification(data.error || 'Delete failed.', 'error');
      }
    } catch (error) {
      console.error(error);
      showNotification('Server error.', 'error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative">
      {/* --- Notification Bar --- */}
      {notification && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-md p-4 text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* --- Add Product Form --- */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          🛍️ Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="border p-3 rounded-lg w-full"
            value={form.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="url"
            placeholder="Product URL"
            className="border p-3 rounded-lg w-full"
            value={form.url}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            className="border p-3 rounded-lg w-full md:col-span-2"
            value={form.description}
            onChange={handleFormChange}
            required
            rows={3}
          />
          <select
            name="category"
            className="border p-3 rounded-lg w-full"
            value={form.category}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="path"
            className="border p-3 rounded-lg w-full"
            value={form.path}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Path</option>
            {paths.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="md:col-span-2 border p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#005f60] file:text-white
                hover:file:bg-[#004c4d]"
              onChange={handleFileChange}
              required
            />
          </div>
          {imagePreview && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
          <button
            type="submit"
            className="md:col-span-2 bg-[#005F60] text-white py-3 rounded-lg hover:bg-[#004c4d] transition duration-200 flex items-center justify-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>

      {/* --- Product List Table --- */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">🧾 Product List</h3>
        {isFetching ? (
          <div className="flex justify-center items-center h-40">
            <Loader2Icon className="w-8 h-8 animate-spin text-[#005F60]" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.path}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[#005F60] hover:text-[#004c4d] mr-4">
                        View
                      </a>
                      <button onClick={() => openEditModal(p)} className="text-blue-600 hover:text-blue-900 mr-4">
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => openDeleteModal(p)} className="text-red-600 hover:text-red-900">
                        <Trash2Icon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- Edit Product Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-3xl m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="border p-3 rounded-lg w-full"
                value={editForm.name}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="url"
                placeholder="Product URL"
                className="border p-3 rounded-lg w-full"
                value={editForm.url}
                onChange={handleEditFormChange}
              />
              <textarea
                name="description"
                placeholder="Product Description"
                className="border p-3 rounded-lg w-full md:col-span-2"
                value={editForm.description}
                onChange={handleEditFormChange}
                rows={3}
              />
              <select
                name="category"
                className="border p-3 rounded-lg w-full"
                value={editForm.category}
                onChange={handleEditFormChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                name="path"
                className="border p-3 rounded-lg w-full"
                value={editForm.path}
                onChange={handleEditFormChange}
              >
                <option value="">Select Path</option>
                {paths.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="md:col-span-2 border p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Change Product Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  onChange={handleEditFileChange}
                />
              </div>
              {editImagePreview && (
                <div className="md:col-span-2 flex justify-center">
                  <img
                    src={editImagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
            <h3 className="text-xl font-semibold mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              <strong>{productToDelete?.name}</strong>"? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
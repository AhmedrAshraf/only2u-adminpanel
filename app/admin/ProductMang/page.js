"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function ProductManagement() {
  // Sample product data
  const initialProducts = [
    {
      id: 1,
      image: '/logo.jpg',
      name: 'Premium Headphones',
      price: 199.99,
      colors: ['#3b82f6', '#1e293b', '#ffffff'],
      quantity: 50,
      status: 'In Stock',
      category: 'Electronics'
    },
    {
      id: 2,
      image: '/logo.jpg',
      name: 'Wireless Mouse',
      price: 29.99,
      colors: ['#000000', '#808080', '#c0c0c0'],
      quantity: 120,
      status: 'In Stock',
      category: 'Accessories'
    },
    {
      id: 3,
      image: '/logo.jpg',
      name: 'Smart Watch',
      price: 159.99,
      colors: ['#000000', '#334155', '#dc2626'],
      quantity: 0,
      status: 'Out of Stock',
      category: 'Electronics'
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showColorModal, setShowColorModal] = useState(false);
  const [currentColorProduct, setCurrentColorProduct] = useState(null);
  const [newColor, setNewColor] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: 'https://via.placeholder.com/150',
    name: '',
    price: 0,
    colors: [],
    quantity: 0,
    status: 'Out of Stock',
    category: 'Electronics'
  });

  // Stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.status === 'In Stock').length;
  const outOfStockProducts = products.filter(p => p.status === 'Out of Stock').length;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle edit
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  // Handle save
  const handleSave = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...editForm } : product
    ));
    setEditingId(null);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle price change
  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setEditForm(prev => ({ ...prev, price: value }));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const newStatus = value > 0 ? 'In Stock' : 'Out of Stock';
      setEditForm(prev => ({ ...prev, quantity: value, status: newStatus }));
    }
  };

  // Open color modal
  const openColorModal = (product) => {
    setCurrentColorProduct(product);
    setShowColorModal(true);
  };

  // Add color
  const addColor = () => {
    if (newColor && !currentColorProduct.colors.includes(newColor)) {
      const updatedColors = [...currentColorProduct.colors, newColor];
      setProducts(products.map(p =>
        p.id === currentColorProduct.id ? { ...p, colors: updatedColors } : p
      ));
      setNewColor('');
    }
  };

  // Remove color
  const removeColor = (colorToRemove) => {
    const updatedColors = currentColorProduct.colors.filter(c => c !== colorToRemove);
    setProducts(products.map(p =>
      p.id === currentColorProduct.id ? { ...p, colors: updatedColors } : p
    ));
    setCurrentColorProduct({ ...currentColorProduct, colors: updatedColors });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Product Management</title>
        <meta name="description" content="Product management admin panel" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Products
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-2 w-2 bg-indigo-500 rounded-full mr-2"></span>
                <span>All products in inventory</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  In Stock
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {inStockProducts}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span>Products available for sale</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Out of Stock
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {outOfStockProducts}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                <span>Products needing restock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <select
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Clothing">Clothing</option>
              </select>

              <button
                className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setCategoryFilter("All");
                }}
              >
                Clear Filters
              </button>
              <button
                className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setShowAddProductModal(true)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colors
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          {editingId === product.id ? (
                            <input
                              type="text"
                              name="name"
                              value={editForm.name}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          name="price"
                          value={editForm.price}
                          onChange={handlePriceChange}
                          className="border rounded px-2 py-1 w-20"
                          step="0.01"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="h-5 w-5 rounded-full border border-gray-200 mr-1"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
                        )}
                        <button
                          onClick={() => openColorModal(product)}
                          className="ml-2 text-xs text-indigo-600 hover:text-indigo-900"
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          name="quantity"
                          value={editForm.quantity}
                          onChange={handleQuantityChange}
                          className="border rounded px-2 py-1 w-20"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">{product.quantity}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === product.id ? (
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === product.id ? (
                        <select
                          name="category"
                          value={editForm.category}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Clothing">Clothing</option>
                        </select>
                      ) : (
                        product.category
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === product.id ? (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleSave(product.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Color Management Modal */}
      {showColorModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Color Management for {currentColorProduct.name}
                </h3>
                <button
                  onClick={() => {
                    setShowColorModal(false);
                    setNewColor('');
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add New Color (HEX or Name)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="#3b82f6 or 'blue'"
                    className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={addColor}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Colors</h4>
                <div className="space-y-2">
                  {currentColorProduct.colors.map((color, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center">
                        <div
                          className="h-6 w-6 rounded-full border border-gray-200 mr-3"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-sm font-mono">{color}</span>
                      </div>
                      <button
                        onClick={() => removeColor(color)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product management Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Add New Product
              </h3>
              <button
                onClick={() => {
                  setShowAddProductModal(false);
                  setNewProduct({
                    image: 'https://via.placeholder.com/150',
                    name: '',
                    price: 0,
                    colors: [],
                    quantity: 0,
                    status: 'Out of Stock',
                    category: 'Electronics'
                  });
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value) || 0;
                    setNewProduct({
                      ...newProduct,
                      quantity,
                      status: quantity > 0 ? 'In Stock' : 'Out of Stock'
                    });
                  }}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                </select>
              </div>

              <button
                onClick={() => {
                  const newId = Math.max(...products.map(p => p.id), 0) + 1;
                  setProducts([...products, { ...newProduct, id: newId }]);
                  setShowAddProductModal(false);
                  setNewProduct({
                    image: 'https://via.placeholder.com/150',
                    name: '',
                    price: 0,
                    colors: [],
                    quantity: 0,
                    status: 'Out of Stock',
                    category: 'Electronics'
                  });
                }}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                disabled={!newProduct.name}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
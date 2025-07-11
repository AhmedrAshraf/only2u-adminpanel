"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);

  // Load data from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      id: Date.now(),
      name,
      description,
      isActive,
      imageUrl: image ? URL.createObjectURL(image) : null,
    };

    setCategories((prev) => [...prev, newCategory]);

    // Reset form
    setName("");
    setDescription("");
    setIsActive(true);
    setImage(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add
        </button>
      </div>

      {/* Render saved categories */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
          >
            {cat.imageUrl && (
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-16 h-16 object-cover rounded-full border"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
              <p className="text-xs mt-1 text-gray-500">
                Status: {cat.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
              Create New Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Category Image
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:border-indigo-500 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="text-indigo-600 hover:underline text-sm font-medium cursor-pointer"
                  >
                    {image ? image.name : "Click to upload image"}
                  </label>
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="mt-3 w-20 h-20 object-cover rounded-full border shadow"
                    />
                  )}
                </div>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter category description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  {isActive ? "Category is active" : "Category is inactive"}
                </span>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

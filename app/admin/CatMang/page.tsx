"use client";

import { useState } from "react";

export default function CategoryForm() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (image) {
      formData.append("image", image);
    }

    console.log("Form Data:", {
      name,
      description,
      isActive,
      imageName: image?.name,
    });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-lg p-10 space-y-8">
        <h2 className="text-3xl font-bold text-indigo-700 text-center">
          Create New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Category Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 hover:border-indigo-500 transition cursor-pointer bg-gray-50">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
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
                  className="mt-4 w-24 h-24 object-cover rounded-full border shadow"
                />
              )}
            </div>
          </div>

          {/* Category Name */}
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700"
            />
          </div>

          {/* Active Checkbox */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Active Status
            </label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">
                {isActive ? "Category is active" : "Category is inactive"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-md transition"
          >
            Save Category
          </button>
        </form>
      </div>
    </section>
  );
}

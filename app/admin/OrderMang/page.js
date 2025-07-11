"use client";

import React, { useState } from "react";
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyOrders = [
  {
    id: "order1",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, NY",
    status: "pending",
    product: "Wireless Headphones",
    quantity: 1,
    price: 99.99,
    proofImage: "/order-proof.jpg"
  },
  {
    id: "order2",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "555-789-1234",
    address: "456 Elm St, CA",
    status: "approved",
    product: "Smart Watch",
    quantity: 2,
    price: 199.99,
    proofImage: "/order-proof2.jpg"
  }
];

const OrderManagementPage = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleApprove = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: "approved" } : order
      )
    );
    toast.success("Order approved successfully");
  };

  const handleReject = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: "rejected" } : order
      )
    );
    toast.error("Order rejected successfully");
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
      toast.success("Order deleted successfully");
    }
  };

  const ViewDetailsModal = ({ order, onClose }) => {
    if (!order) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-xl w-full">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Product:</strong> {order.product}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Price:</strong> ${order.price}</p>
            <img src={order.proofImage} alt="Proof" className="w-40 rounded-md mt-4" />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => handleReject(order.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
            <button onClick={() => handleApprove(order.id)} className="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleApprove(order.id)}
                        className="text-green-600 hover:text-green-900"
                        disabled={order.status === 'approved'}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={order.status === 'rejected'}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {viewModalOpen && selectedOrder && (
        <ViewDetailsModal
          order={selectedOrder}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderManagementPage;

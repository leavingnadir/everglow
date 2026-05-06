import React, { useState, useEffect } from 'react';
import { fetchVendors, deleteVendor } from '../../services/vendorService';
import VendorForm from '../../components/vendors/VendorForm';

const AdminVendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState(null);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await fetchVendors();
      setVendors(data);
    } catch (error) {
      console.error('Failed to fetch vendors', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(id);
        loadVendors();
      } catch (error) {
        console.error('Failed to delete vendor', error);
        alert('Error deleting vendor');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingVendorId(id);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setEditingVendorId(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadVendors();
  };

  if (showForm) {
    return (
      <div className="py-10 px-6 max-w-6xl mx-auto">
        <button onClick={() => setShowForm(false)} className="mb-6 text-sm text-gray-500 hover:text-black">
          &larr; Back to Dashboard
        </button>
        <VendorForm vendorId={editingVendorId} onSuccess={handleFormSuccess} />
      </div>
    );
  }

  return (
    <div className="py-10 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <h2 className="text-3xl font-serif">Vendor Management</h2>
        <button 
          onClick={handleCreateNew}
          className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
        >
          + Add New Vendor
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow-sm border rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                <th className="p-4 font-medium">Business Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No vendors found.</td>
                </tr>
              ) : (
                vendors.map(vendor => (
                  <tr key={vendor.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{vendor.businessName}</td>
                    <td className="p-4 text-sm text-gray-600">{vendor.category}</td>
                    <td className="p-4 text-sm text-gray-600">
                      <div>{vendor.contactEmail}</div>
                      <div className="text-xs text-gray-500">{vendor.contactPhone}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{vendor.rating} ★</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEdit(vendor.id)} className="text-blue-600 hover:text-blue-800 text-sm mr-4">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(vendor.id)} className="text-red-600 hover:text-red-800 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminVendorDashboard;

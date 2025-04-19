import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDealById, updateDealStatus } from '../../redux/dealSlice';

const DealDetails = () => {
  const { id } = useParams(); // from route: /deals/:id
  const dispatch = useDispatch();

  const { singleDeal, loading, error } = useSelector((state) => state.deal);

  useEffect(() => {
    if (id) {
      dispatch(fetchDealById(id));
    }
  }, [id, dispatch]);

  const handleStatusUpdate = async (newStatus) => {
   await dispatch(updateDealStatus({ dealId: id, status: newStatus }));
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!singleDeal) return <p className="p-4">No deal found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{singleDeal.title}</h2>
      <p className="mb-2 text-gray-700">{singleDeal.description}</p>
      <p className="mb-2 text-green-600 font-semibold">Price: ₹{singleDeal.price}</p>
      <p className="mb-2">Seller ID: {singleDeal.sellerId}</p>
      <p className="mb-4 font-medium">
        Status: <span className="text-blue-500">{singleDeal.status}</span>
      </p>

      {/* Update Status Buttons */}
      {singleDeal.status === 'Pending' && (
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleStatusUpdate('In Progress')}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleStatusUpdate('Cancelled')}
          >
            Reject
          </button>
        </div>
      )}

      {singleDeal.status === 'In Progress' && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => handleStatusUpdate('Completed')}
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default DealDetails;

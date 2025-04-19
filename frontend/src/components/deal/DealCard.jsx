import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DealCard from '../../components/deal/DealCard';
import { fetchDeals } from '../../redux/dealSlice';

const DealList = () => {
  const dispatch = useDispatch();
  const { deals, loading, error } = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  if (loading) return <div>Loading deals...</div>;
  if (error) return <div className="text-red-600">Error: {error.message || error}</div>;

  if (!Array.isArray(deals) || deals.length === 0) {
    return <div>No deals available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((deal) => (
        <DealCard key={deal._id} deal={deal} />
      ))}
    </div>
  );
};

export default DealList;

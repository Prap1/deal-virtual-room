import React from 'react'
import Header from '../../components/Common/Header'
import DealList from '../Deals/DealList'
import DealForm from '../../components/deal/DealForm'

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <main className="container mx-auto mt-4 px-4 py-6">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Your Deals</h1>
      <DealForm />
      <DealList/>
      
    </main>
  </div>
  )
}

export default SellerDashboard
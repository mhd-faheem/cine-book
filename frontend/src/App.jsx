import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import ProtectedRoute from "./components/ProtectedRoute";
import SeatSelection from './pages/SeatSelection'
import PaymentPage from './pages/PaymentPage'
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/bookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/movies/:id/seats" element={<SeatSelection />} />
      <Route path="/movies/:id/seats/payment" element={<PaymentPage/>}/>
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
        </ProtectedRoute>
    }
/>
    </Routes>
  )
}

export default App
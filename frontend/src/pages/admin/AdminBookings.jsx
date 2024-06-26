import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import Bookings from "../../components/admin/Bookings"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from "../../components/admin/AdminSidebar"

/** --- CONTEXT --- */
import { useAdminContext } from "../../hooks/useAdminContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const AdminBookings = () => {
  const { recentBookings, dispatch } = useAdminContext()
  const { userLG } = useAuthContext()
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch('/api/bookings/recent-bookings', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_BOOKINGS', payload: json })
      }
      setLoading(false); // Set loading to false when data fetching is complete
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false); // Set loading to false even in case of error
    }
  }, [dispatch, userLG]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Function to handle lead update
  const handleBookingDelete = useCallback(() => {
    setLoading(true); // Set loading state to true to indicate data fetching
    // Perform any necessary actions to update leads or refetch data
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-full overflow-y-hidden">
        <AdminNavbar />
        <div className="p-1 flex-grow flex justify-center items-center">
          {loading ? (
            <CircularProgress />
          ) : (
              <div className="flex flex-col w-full items-center overflow-y-hidden">
                <div className="w-full">
                  <Bookings recentBookings={recentBookings} onLeadDelete={handleBookingDelete} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AdminBookings;
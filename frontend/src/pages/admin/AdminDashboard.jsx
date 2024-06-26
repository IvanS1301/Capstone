import React, { useEffect, useState } from 'react';

/** --- COMPONENTS --- */
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DashboardTabs from "../../components/admin/DashboardTabs";

/** --- CONTEXT --- */
import { useAdminContext } from "../../hooks/useAdminContext";
import { useAuthContext } from "../../hooks/useAuthContext";

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

const AdminDashboard = () => {
    const { dispatch } = useAdminContext();
    const { userLG } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState(null);
    const [recentBookings, setRecentBookings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inventoryRes, bookingsRes] = await Promise.all([
                    fetch('/api/inventories/inventory', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    }),
                    fetch('/api/bookings/recent-bookings', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    })
                ]);

                const [inventoryData, bookingsData] = await Promise.all([
                    inventoryRes.json(),
                    bookingsRes.json()
                ]);

                if (inventoryRes.ok && bookingsRes.ok) {
                    setInventory(inventoryData);
                    setRecentBookings(bookingsData);
                    dispatch({ type: 'SET_INVENTORY', payload: inventoryData });
                    dispatch({ type: 'SET_BOOKINGS', payload: bookingsData });
                } else {
                    console.error('Failed to fetch data', { inventoryData, bookingsData });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userLG]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <CircularProgress />
                <p className="text-gray-500 text-2xl font-semibold mt-10 justify-center items-center">Loading...</p>
            </div>
        );
    }

    if (!inventory || !recentBookings) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Failed to load data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div>
                <AdminNavbar />
                <div className="p-1">
                    <DashboardTabs inventory={inventory} recentBookings={recentBookings} />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
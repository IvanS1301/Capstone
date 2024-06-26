import React, { useState, useEffect } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import LeadGenStats from "../../components/admin/LeadGenStats"
import BookedUnits from "../../components/admin/BookedUnits"
import LeadDistribution from "../../components/admin/LeadDistribution"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminNavbar from '../../components/admin/AdminNavbar'

/** --- CONTEXT --- */
import { useServicesContext } from "../../hooks/useServicesContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const AdminStaff = () => {
    const { leadGenStats, bookedUnits, dispatch } = useServicesContext()
    const { userLG } = useAuthContext()
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leadGenRes, bookedUnitsRes] = await Promise.all([
                    fetch('/api/services/lead-gen-performance', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    }),
                    fetch('/api/services/booked-units-performance', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    })
                ]);

                const [leadGenData, bookedUnitsData] = await Promise.all([
                    leadGenRes.json(),
                    bookedUnitsRes.json()
                ]);

                if (leadGenRes.ok && bookedUnitsRes.ok) {
                    dispatch({ type: 'SET_LEADGEN_STATS', payload: leadGenData });
                    dispatch({ type: 'SET_BOOKED_UNITS', payload: bookedUnitsData });
                } else {
                    console.error('Failed to fetch data', { leadGenData, bookedUnitsData });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userLG]);

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
                                    <LeadDistribution bookedUnits={bookedUnits} />
                                </div>
                                <div className="w-full">
                                    <BookedUnits bookedUnits={bookedUnits} />
                                </div>
                                <div className="w-full">
                                    <LeadGenStats leadGenStats={leadGenStats} />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default AdminStaff
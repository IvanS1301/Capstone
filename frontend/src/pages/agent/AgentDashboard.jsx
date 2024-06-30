import React, { useEffect, useState } from 'react';

/** --- COMPONENTS --- */
import AgentSidebar from '../../components/agent/AgentSidebar';
import AgentNavbar from '../../components/agent/AgentNavbar';
import AGDashboardTabs from "../../components/agent/AGDashboardTabs";

/** --- CONTEXT --- */
import { useLeadsContext } from "../../hooks/useLeadsContext";
import { useServicesContext } from "../../hooks/useServicesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

const AgentDashboard = () => {
    const { dispatch: dispatchLeads } = useLeadsContext();
    const { dispatch: dispatchServices } = useServicesContext();
    const { userLG } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [bookedUnits, setBookedUnits] = useState(null);
    const [unassignedLeads, setUnassignedLeads] = useState(null);
    const [userBookedUnits, setUserBookedUnits] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookedUnitsRes, unassignedLeadsRes] = await Promise.all([
                    fetch('/api/services/booked-units-performance', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    }),
                    fetch('/api/leads/unassigned', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    })
                ]);

                const [bookedUnitsData, unassignedLeadsData] = await Promise.all([
                    bookedUnitsRes.json(),
                    unassignedLeadsRes.json(),
                ]);

                if (bookedUnitsRes.ok && unassignedLeadsRes.ok) {
                    setBookedUnits(bookedUnitsData);
                    setUnassignedLeads(unassignedLeadsData);
                    dispatchServices({ type: 'SET_BOOKED_UNITS', payload: bookedUnitsData });
                    dispatchLeads({ type: 'SET_UNASSIGNED_LEADS', payload: unassignedLeadsData });
                } else {
                    console.error('Failed to fetch data', { bookedUnitsData, unassignedLeadsData });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatchServices, dispatchLeads, userLG]);

    useEffect(() => {
        if (bookedUnits && userLG) {
            const userBooked = bookedUnits.find(booked => booked.telemarketerName === userLG.name);
            setUserBookedUnits(userBooked);
        }
    }, [bookedUnits, userLG]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <CircularProgress />
                <p className="text-gray-800 text-2xl font-semibold mt-10 justify-center items-center">Loading...</p>
            </div>
        );
    }

    if (!userBookedUnits) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-800 text-2xl font-semibold">Failed to load data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <AgentSidebar />
            <div className="flex flex-col w-full overflow-y-hidden">
                <AgentNavbar />
                <div className="p-1 flex-grow flex justify-center items-center">
                    <div className="flex flex-col w-full items-center overflow-y-hidden">
                        <div className="w-full">
                            <AGDashboardTabs bookedUnits={userBookedUnits} unassignedLeads={unassignedLeads} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;
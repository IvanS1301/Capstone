import React, { useEffect, useState } from 'react';

/** --- COMPONENTS --- */
import LeadGenSidebar from '../../components/leadgen/LeadGenSidebar';
import LeadGenNavbar from '../../components/leadgen/LeadGenNavbar';
import LGDashboardTabs from "../../components/leadgen/LGDashboardTabs";

/** --- CONTEXT --- */
import { useLeadgenContext } from "../../hooks/useLeadgenContext";
import { useServicesContext } from "../../hooks/useServicesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

const LeadGenDashboard = () => {
    const { dispatch: dispatchLeads } = useLeadgenContext();
    const { dispatch: dispatchServices } = useServicesContext();
    const { userLG } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [leadGenStats, setLeadGenStats] = useState(null);
    const [leads, setLeads] = useState(null);
    const [userLeadGenStats, setUserLeadGenStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leadGenStatsRes, leadsRes] = await Promise.all([
                    fetch('/api/services/lead-gen-performance', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    }),
                    fetch('/api/leads', {
                        headers: { 'Authorization': `Bearer ${userLG.token}` },
                    })
                ]);

                const [leadGenStatsData, leadsData] = await Promise.all([
                    leadGenStatsRes.json(),
                    leadsRes.json()
                ]);

                if (leadGenStatsRes.ok && leadsRes.ok) {
                    setLeadGenStats(leadGenStatsData);
                    setLeads(leadsData);
                    dispatchServices({ type: 'SET_LEADGEN_STATS', payload: leadGenStatsData });
                    dispatchLeads({ type: 'SET_LEADS', payload: leadsData });
                } else {
                    console.error('Failed to fetch data', { leadGenStatsData, leadsData });
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
        if (leadGenStats && userLG) {
            const userStats = leadGenStats.find(stats => stats.leadGenName === userLG.name);
            setUserLeadGenStats(userStats);
        }
    }, [leadGenStats, userLG]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <CircularProgress />
                <p className="text-gray-800 text-2xl font-semibold mt-10 justify-center items-center">Loading...</p>
            </div>
        );
    }

    if (!userLeadGenStats) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-800 text-2xl font-semibold">Failed to load data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <LeadGenSidebar />
            <div className="flex flex-col w-full overflow-y-hidden">
                <LeadGenNavbar />
                <div className="p-1 flex-grow flex justify-center items-center">
                    <div className="flex flex-col w-full items-center overflow-y-hidden">
                        <div className="w-full">
                            <LGDashboardTabs leadGenStats={userLeadGenStats} leads={leads} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeadGenDashboard;
import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@mui/material';

// components
import LeadGenSidebar from '../../components/leadgen/LeadGenSidebar';
import LeadGenNavbar from '../../components/leadgen/LeadGenNavbar';
import ViewUserLG from '../../components/profile/ViewUserLG'
import { useUsersContext } from "../../hooks/useUsersContext";

const ReadUserLG = () => {
    const { dispatch } = useUsersContext();
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/userLG');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_USERS', payload: json });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUserUpdate = useCallback(() => {
        setLoading(true);
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="flex">
            <LeadGenSidebar />
            <div className="flex flex-col w-full overflow-y-hidden">
                <LeadGenNavbar />
                <div className="p-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <CircularProgress />
                        </div>
                    ) : (
                            <ViewUserLG onUserUpdate={handleUserUpdate} />
                        )}
                </div>
            </div>
        </div>
    );
}

export default ReadUserLG
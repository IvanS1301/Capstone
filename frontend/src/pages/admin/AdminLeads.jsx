import React, { useState, useEffect, useCallback } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import LeadList from "../../components/admin/LeadList";
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from "../../components/admin/AdminSidebar";

/** --- CONTEXT --- */
import { useLeadsContext } from "../../hooks/useLeadsContext";
import { useUsersContext } from "../../hooks/useUsersContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminLeads = () => {
  const { tlLeads, dispatch } = useLeadsContext();
  const { userlgs, dispatch: dispatchUsers } = useUsersContext();
  const { userLG } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/leads/tl', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TL_LEADS', payload: json });
        setFilteredLeads(json); // Initialize filteredLeads with all leads initially
      }
      setLoading(false); // Set loading to false when data fetching is complete
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false); // Set loading to false even in case of error
    }
  }, [dispatch, userLG]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleLeadUpdate = useCallback(() => {
    setLoading(true); // Set loading state to true to indicate data fetching
    // Perform any necessary actions to update leads or refetch data
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/api/userLG');
      const json = await response.json();

      if (response.ok) {
        dispatchUsers({ type: 'SET_USERS', payload: json });
      }
    };

    fetchUsers();
  }, [dispatchUsers]);

  // Function to handle search
  const handleSearch = useCallback((query) => {
    const lowerCaseQuery = query.toLowerCase(); // Convert query to lowercase for case-insensitive search
    setSearchQuery(query);

    if (lowerCaseQuery.trim() === "") {
      setFilteredLeads(tlLeads); // If query is empty, show all leads
    } else {
      const filtered = tlLeads.filter((lead) => {
        const name = lead.name ? lead.name.toLowerCase() : '';
        const type = lead.type ? lead.type.toLowerCase() : '';
        const callDisposition = lead.callDisposition ? lead.callDisposition.toLowerCase() : '';
        const assignedTo = userlgs.find(user => user._id === lead.assignedTo);
        const assignedToName = assignedTo ? assignedTo.name.toLowerCase() : '';

        return name.includes(lowerCaseQuery) || type.includes(lowerCaseQuery) || callDisposition.includes(lowerCaseQuery) || assignedToName.includes(lowerCaseQuery);
      });
      setFilteredLeads(filtered);
    }
  }, [tlLeads, userlgs]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-full overflow-y-hidden">
        <AdminNavbar onSearch={handleSearch} />
        <div className="p-1 flex-grow flex justify-center items-center">
          {loading ? (
            <CircularProgress />
          ) : (
              <div className="flex flex-col w-full items-center overflow-y-hidden">
                <div className="w-full">
                  <LeadList tlLeads={searchQuery ? filteredLeads : tlLeads} userlgs={userlgs} onLeadUpdate={handleLeadUpdate} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
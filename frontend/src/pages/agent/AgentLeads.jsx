import React, { useState, useEffect, useCallback } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import AgentLeadDetails from "../../components/agent/AgentLeadDetails"
import AgentNavbar from '../../components/agent/AgentNavbar'
import AgentSidebar from "../../components/agent/AgentSidebar"

/** --- CONTEXT --- */
import { useLeadsContext } from "../../hooks/useLeadsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const AgentLeads = () => {
  const { unassignedLeads, dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true); // Start loading when fetching leads
      const response = await fetch('/api/leads/unassigned', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_UNASSIGNED_LEADS', payload: json })
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

  // Function to handle lead update
  const handleLeadUpdate = useCallback(() => {
    // Perform any necessary actions to update leads or refetch data
    fetchLeads();
  }, [fetchLeads]);


  return (
    <div className="flex">
      <AgentSidebar />
      <div className="flex flex-col w-full overflow-y-hidden">
        <AgentNavbar />
        <div className="p-1 flex-grow flex justify-center items-center">
          {loading ? (
            <CircularProgress />
          ) : (
              <div className="flex flex-col w-full items-center overflow-y-hidden">
                <div className="w-full">
                  <AgentLeadDetails unassignedLeads={unassignedLeads} onLeadUpdate={handleLeadUpdate} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AgentLeads;
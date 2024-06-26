import React, { useState, useEffect, useCallback } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import AgentEmailList from "../../components/agent/AgentEmailList"
import AgentNavbar from '../../components/agent/AgentNavbar'
import AgentSidebar from "../../components/agent/AgentSidebar"

/** --- CONTEXT --- */
import { useEmailsContext } from "../../hooks/useEmailsContext"
import { useUsersContext } from "../../hooks/useUsersContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const AgentEmails = () => {
  const { emails, dispatch } = useEmailsContext()
  const { userlgs, dispatch: dispatchUsers } = useUsersContext()
  const { userLG } = useAuthContext()
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchEmails = useCallback(async () => {
    try {
      const response = await fetch('/api/emails/', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_EMAILS_AGENT', payload: json })
      }
      setLoading(false); // Set loading to false when data fetching is complete
    } catch (error) {
      console.error('Error fetching email:', error);
      setLoading(false); // Set loading to false even in case of error
    }
  }, [dispatch, userLG]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/userLG')
      const json = await response.json()

      if (response.ok) {
        dispatchUsers({ type: 'SET_USERS', payload: json })
      }
    }

    fetchUsers()
  }, [dispatchUsers])

  // Function to handle lead update
  const handleEmailDelete = useCallback(() => {
    setLoading(true); // Set loading state to true to indicate data fetching
    // Perform any necessary actions to update leads or refetch data
    fetchEmails();
  }, [fetchEmails]);

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
                  <AgentEmailList emails={emails} userlgs={userlgs} onEmailDelete={handleEmailDelete} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AgentEmails;
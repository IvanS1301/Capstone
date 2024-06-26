import React, { useState, useEffect, useCallback } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import EmailList from "../../components/admin/EmailList"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from "../../components/admin/AdminSidebar"

/** --- CONTEXT --- */
import { useEmailsContext } from "../../hooks/useEmailsContext"
import { useUsersContext } from "../../hooks/useUsersContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const AdminEmails = () => {
  const { emails, dispatch } = useEmailsContext()
  const { userlgs, dispatch: dispatchUsers } = useUsersContext()
  const { userLG } = useAuthContext()
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchEmails = useCallback(async () => {
    try {
      const response = await fetch('/api/emails/tl', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_EMAILS', payload: json })
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
      <AdminSidebar />
      <div className="flex flex-col w-full overflow-y-hidden">
        <AdminNavbar />
        <div className="p-1 flex-grow flex justify-center items-center">
          {loading ? (
            <CircularProgress />
          ) : (
              <div className="flex flex-col w-full items-center overflow-y-hidden">
                <div className="w-full">
                  <EmailList emails={emails} userlgs={userlgs} onEmailDelete={handleEmailDelete} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AdminEmails;
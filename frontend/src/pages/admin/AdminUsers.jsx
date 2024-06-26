import React, { useState, useEffect, useCallback } from 'react';

/** --- MATERIAL UI --- */
import { CircularProgress } from "@mui/material";

/** --- COMPONENTS --- */
import UserLists from "../../components/admin/UserLists";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from '../../components/admin/AdminNavbar';

/** --- CONTEXT --- */
import { useUsersContext } from "../../hooks/useUsersContext";

const AdminUsers = () => {
  const { userlgs, dispatch } = useUsersContext();
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
      <AdminSidebar />
      <div className="flex flex-col w-full overflow-y-hidden">
        <AdminNavbar />
        <div className="p-1 flex-grow flex justify-center items-center">
          {loading ? (
            <CircularProgress />
          ) : (
              <div className="flex flex-col w-full items-center overflow-y-hidden">
                <div className="w-full">
                  <UserLists userlgs={userlgs} onUserUpdate={handleUserUpdate} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
import React from 'react';

/** --- COMPONENTS --- */
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AddUser from '../../components/admin/AddUser';

const AdminSignup = () => {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex flex-col w-full overflow-y-hidden">
                <AdminNavbar />
                <div className="p-2 mt-10">
                    <AddUser />
                </div>
            </div>
        </div>
    );
}

export default AdminSignup
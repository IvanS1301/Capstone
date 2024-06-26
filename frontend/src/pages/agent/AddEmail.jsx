import React from 'react';

/** --- COMPONENTS --- */
import EmailForm from '../../components/agent/EmailForm'
import AgentSidebar from '../../components/agent/AgentSidebar';
import AgentNavbar from '../../components/agent/AgentNavbar';

const AddEmail = () => {
    return (
        <div className="flex">
            <AgentSidebar />
            <div className="flex flex-col w-full overflow-y-hidden">
                <AgentNavbar />
                <div className="p-2">
                    <EmailForm />
                </div>
            </div>
        </div>
    );
}

export default AddEmail
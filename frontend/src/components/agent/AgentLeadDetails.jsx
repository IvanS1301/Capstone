import React, { useState } from 'react';

/** --- MATERIAL UI --- */
import { Box, IconButton, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Visibility, Edit } from '@mui/icons-material';

/** --- IMPORT CHART DESIGN AND TIME AND DATE FORMAT --- */
import Header from '../Chart/Header';
import moment from 'moment';

/** --- FOR MODAL --- */
import AgentEditForm from '../../pages/agent/AgentEditForm';
import AgentReadForm from '../../pages/agent/AgentReadForm';

const AgentLeadDetails = ({ unassignedLeads, userlgs, onLeadUpdate }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false); // State for ViewLead modal

  const handleOpenAssignModal = (unassignedId) => {
    setSelectedLeadId(unassignedId);
    setOpenAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setOpenAssignModal(false);
    setSelectedLeadId(null);
  };

  const handleOpenViewModal = (unassignedId) => {
    setSelectedLeadId(unassignedId);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedLeadId(null);
  };

  const iconButtonStyle = { color: "#e0e0e0" };

  // Custom rendering function for status
  const renderStatusCell = (params) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Booked':
          return 'bg-emerald-700';
        case 'Warm Lead':
          return 'bg-rose-700';
        case 'Email':
          return 'bg-cyan-800';
        default:
          return 'none'; // Default color for unrecognized statuses
      }
    };

    const statusColorClass = getStatusColor(params.value);

    return (
      <div className="flex items-center h-full mr-3 mb-4">
        <div className={`flex items-center justify-center text-white rounded-full w-40 h-7 ${statusColorClass}`}>
          {params.value}
        </div>
      </div>
    );
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => params.value.slice(20, 26)
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 280,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "emailaddress",
      headerName: "Email",
      flex: 1,
      minWidth: 320,
      cellClassName: "name-column--cell",
    },
    {
      field: "callDisposition",
      headerName: "Call Disposition",
      flex: 1,
      minWidth: 220,
      renderCell: renderStatusCell,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 180
    },
    {
      field: "Distributed",
      headerName: "Distributed",
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        moment(params.row.Distributed).startOf('minute').fromNow()
    },
    {
      field: "updatedAt",
      headerName: "Last Touch",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const callDisposition = params.row.callDisposition;
        return callDisposition ? moment(params.row.updatedAt).startOf('minute').fromNow() : '';
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenViewModal(params.row._id)} style={iconButtonStyle}><Visibility /></IconButton>
          <IconButton onClick={() => handleOpenAssignModal(params.row._id)} style={iconButtonStyle}><Edit /></IconButton>
        </Box>
      )
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="ASSIGNED LEADS"
        subtitle="List of Assigned Leads"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: "#e0e0e0",
          },
          "& .name-column--cell": {
            color: "#94e2cd",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#062438",
            borderBottom: "none",
            color: "#e0e0e0",
            fontSize: "18px"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#101624",
            fontSize: "17px",
          },
          "& .MuiDataGrid-headerContainer": {
            borderTop: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#062438",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#e0e0e0 !important`,
          },
        }}
      >
        <DataGrid
          rows={unassignedLeads}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          selectionModel={selectedRows}
          slots={{
            toolbar: GridToolbar,
          }}
          getRowId={row => row._id}
        />
      </Box>

      <Modal
        open={openAssignModal}
        onClose={handleCloseAssignModal}
        aria-labelledby="assign-lead-modal-title"
        aria-describedby="assign-lead-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedLeadId && <AgentEditForm unassignedId={selectedLeadId} onLeadUpdate={onLeadUpdate} />}
        </Box>
      </Modal>

      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby="view-lead-modal-title"
        aria-describedby="view-lead-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '80%',
            overflow: 'auto',


          }}
        >
          {selectedLeadId && <AgentReadForm unassignedId={selectedLeadId} />}
        </Box>
      </Modal>

    </Box>
  );
};

export default AgentLeadDetails;
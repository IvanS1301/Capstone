import React, { useState } from 'react'

/** --- MATERIAL UI --- */
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

/** --- IMPORT CHART DESIGN --- */
import Header from '../Chart/Header';

const LeadDistribution = ({ bookedUnits }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => params.value.slice(20, 26)
        },
        {
            field: "telemarketerName",
            headerName: "Telemarketer",
            flex: 1,
            minWidth: 250,
            cellClassName: "name-column--cell",
        },
        {
            field: "assignedDaily",
            headerName: "Assigned Leads Daily",
            flex: 1,
            minWidth: 250,
        },
        {
            field: "assignedYesterday",
            headerName: "Assigned Lead Yesterday",
            flex: 1,
            minWidth: 300,
        },
        {
            field: "assignedLeadStatus",
            headerName: "Assigned Lead Status",
            flex: 1,
            minWidth: 300,
        },
        {
            field: "assignedLeadsAvailable",
            headerName: "Assigned Leads Available",
            flex: 1,
            minWidth: 300,
        },
        {
            field: "totalAssignedLeads",
            headerName: "Total Assigned Leads",
            flex: 1,
            minWidth: 300,
            cellClassName: "name-column--cell",
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="LEAD DISTRIBUTION"
                subtitle="Assigned Leads Summary"
            />
            <Box
                m="30px 0 0 0"
                height="39vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        color: "#e0e0e0",
                        borderTop: "1px solid #525252",
                    },
                    "& .name-column--cell": {
                        color: "#94e2cd",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#062438",
                        borderBottom: "none",
                        color: "#e0e0e0",
                        fontSize: "18px",
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
                    rows={bookedUnits}
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
        </Box>
    );
};

export default LeadDistribution;
import React, { useState } from 'react'

/** --- MATERIAL UI --- */
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

/** --- IMPORT CHART DESIGN --- */
import Header from '../Chart/Header';

const BookedUnits = ({ bookedUnits }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 350,
            renderCell: (params) => params.value.slice(20, 26)
        },
        {
            field: "telemarketerName",
            headerName: "Telemarketer",
            flex: 1,
            minWidth: 400,
            cellClassName: "name-column--cell",
        },
        {
            field: "bookedDaily",
            headerName: "Booked Daily",
            flex: 1,
            minWidth: 400,
        },
        {
            field: "bookedMonth",
            headerName: "Booked Month-to-Date",
            flex: 1,
            minWidth: 400,
        },
        {
            field: "totalBooked",
            headerName: "All Time",
            flex: 1,
            minWidth: 300,
            cellClassName: "name-column--cell",
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="TELEMARKETER PERFORMANCE"
                subtitle="Booked Summary"
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
                        borderTop: "1px solid #444",
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

export default BookedUnits;
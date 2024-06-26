/** --- MATERIAL UI --- */
import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ContactsOutlined } from "@mui/icons-material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

/** --- IMPORT CHART --- */
import Header from '../Chart/Header';
import StatBox from '../Chart/StatBox';

const AgentAnalyticsTabs = ({ bookedUnits }) => {
    if (!bookedUnits) {
        return <Typography variant="h6" color="error">No data available</Typography>;
    }

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Booked Summary" subtitle="Statistics for Today" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: "#3e4396",
                            color: "#e0e0e0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={bookedUnits.assignedDaily || 0}
                        subtitle="New Assigned Leads"
                        progress={bookedUnits.assignedDaily || 0}
                        increase={bookedUnits.assignedDaily || 0}
                        icon={
                            <ContactsOutlined
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={bookedUnits.bookedDaily || 0}
                        subtitle="Booked Daily"
                        progress={bookedUnits.bookedDaily || 0}
                        increase={bookedUnits.bookedDaily || 0}
                        icon={
                            <ContactsOutlined
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={bookedUnits.bookedMonth || 0}
                        subtitle="Booked Month-to-Date"
                        progress={bookedUnits.bookedMonth || 0}
                        increase={bookedUnits.bookedMonth || 0}
                        icon={
                            <AssignmentTurnedInIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={bookedUnits.totalBooked || 0}
                        subtitle="All Time"
                        progress={bookedUnits.totalBooked || 0}
                        increase={bookedUnits.totalBooked || 0}
                        icon={
                            <AssignmentIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 4"
                    backgroundColor="#101624"
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid #1F2A40`}
                        colors="#e0e0e0"
                        p="15px"
                    >
                        <Typography color="#e0e0e0" variant="h5" fontWeight="600">
                            Types Received Today
                        </Typography>
                    </Box>
                    {bookedUnits.typesReceivedDaily &&
                        Object.entries(bookedUnits.typesReceivedDaily).map(([type, count]) => (
                            <Box
                                key={type}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid #1F2A40`}
                                p="25px"
                            >
                                <Typography color="#e0e0e0" fontSize="18px">{type}</Typography>
                                <Typography color="#4cceac" fontSize="18px">{count}</Typography>
                            </Box>
                        ))}
                </Box>

                <Box
                    gridColumn="span 6"
                    gridRow="span 4"
                    backgroundColor="#101624"
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid #1F2A40`}
                        colors="#e0e0e0"
                        p="15px"
                    >
                        <Typography color="#e0e0e0" variant="h5" fontWeight="600">
                            Call Dispositions Today
                        </Typography>
                    </Box>
                    {bookedUnits.callDispositionDaily &&
                        Object.entries(bookedUnits.callDispositionDaily).map(([disposition, count]) => (
                            <Box
                                key={disposition}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid #1F2A40`}
                                p="25px"
                            >
                                <Typography color="#e0e0e0" fontSize="18px">{disposition}</Typography>
                                <Typography color="#4cceac" fontSize="18px">{count}</Typography>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    );
};

export default AgentAnalyticsTabs;
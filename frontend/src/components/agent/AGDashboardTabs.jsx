import { Box, Button, Typography } from "@mui/material";

/** --- OTHER MATERIAL UI ICONS --- */
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { PeopleOutlined, ContactsOutlined } from "@mui/icons-material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

/** --- CALL DISPOSITION ICONS --- */
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import HouseIcon from '@mui/icons-material/House';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PhoneCallbackRoundedIcon from '@mui/icons-material/PhoneCallbackRounded';
import PhoneMissedRoundedIcon from '@mui/icons-material/PhoneMissedRounded';
import PhoneDisabledRoundedIcon from '@mui/icons-material/PhoneDisabledRounded';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

/** --- IMPORT CHART --- */
import Header from '../Chart/Header';
import StatBox from '../Chart/StatBox';
import ProgressCircle from "../Chart/ProgressCircle";

/** --- TIME AND DATE FORMAT --- */
import moment from 'moment';

const AGDashboardTabs = ({ bookedUnits, unassignedLeads }) => {

    /** --- CALL DISPOSITION COUNTS --- */
    const bookedCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Booked"] || 0 : 0;
    const warmLeadCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Warm Lead"] || 0 : 0;
    const notEligibleCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Not Eligible"] || 0 : 0;
    const alreadyInstalledCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Already Installed"] || 0 : 0;
    const notWorkingCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Wrong/Not Working"] || 0 : 0;
    const residentialCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Residential"] || 0 : 0;
    const callbackCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Callback"] || 0 : 0;
    const doNotCallCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Do Not Call"] || 0 : 0;
    const noAnswerCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["No Answer"] || 0 : 0;
    const notInterested = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Not Interested"] || 0 : 0;
    const voicemailCount = bookedUnits.callDispositionCreated ? bookedUnits.callDispositionCreated["Voicemail"] || 0 : 0;

    /** --- PROGRESS CIRCLE FORMAT --- */
    const totalLeadsProgress = (bookedUnits.totalAssignedLeads / bookedUnits.totalAssignedLeads) * 100;
    const totalLeadsIncrease = ((bookedUnits.totalAssignedLeads / bookedUnits.totalAssignedLeads) * 100).toFixed(2);

    /** --- INCREASE FORMAT PERCENTAGE --- */
    const statusIncrease = ((bookedUnits.totalAssignedLeads - bookedUnits.assignedLeadsAvailable) / bookedUnits.totalAssignedLeads * 100).toFixed(2);
    const availableIncrease = ((bookedUnits.totalAssignedLeads - bookedUnits.assignedLeadStatus) / bookedUnits.totalAssignedLeads * 100).toFixed(2);
    const notEligibleIncrease = ((notEligibleCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const installedIncrease = ((alreadyInstalledCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const wrongIncrease = ((notWorkingCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const callBackIncrease = ((callbackCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const doNotCallIncrease = ((doNotCallCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const noAnswerIncrease = ((noAnswerCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const notInterestedIncrease = ((notInterested / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const voicemailIncrease = ((voicemailCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);
    const residentialIncrease = ((residentialCount / bookedUnits.totalAssignedLeads) * 100).toFixed(2);

    /** --- HEADER SUBTITLE FORMAT --- */
    const formattedDate = moment(bookedUnits.updatedAt).format('MMMM Do YYYY, h:mm:ss a');

    /** --- DOWNLOAD REPORTS AS CSV FILE --- */
    const handleDownloadReports = () => {
        const csvHeaders = [
            'Assigned Leads Daily',
            'Assigned Leads Yesterday',
            'Assigned Lead Status',
            'Total Assigned Leads',
            'Lead Name',
            'Lead City',
            'Lead Type',
            'Emails Sent',
            'Booked Count',
            'Warm Lead Count',
            'Not Eligible Count',
            'Already Installed Count',
            'Not Working Count',
            'Residential Count',
            'Callback Count',
            'Do Not Call Count',
            'No Answer Count',
            'Not Interested Count',
            'Voicemail Count'
        ];

        // Report header row
        const reportHeader = [
            'DASHBOARD REPORT',
            `As of ${formattedDate}`
        ];

        const totalRow = [
            `"${bookedUnits.assignedDaily || 0}"`,
            `"${bookedUnits.assignedYesterday || 0}"`,
            `"${bookedUnits.assignedLeadStatus || 0}"`,
            `"${bookedUnits.totalAssignedLeads || 0}"`,
            '', '', '', // Empty fields for telemarketerName, leadName, and callDisposition
            `"${bookedUnits.emailsSent || 0}"`,
            `"${bookedCount || 0}"`,
            `"${warmLeadCount || 0}"`,
            `"${notEligibleCount || 0}"`,
            `"${alreadyInstalledCount || 0}"`,
            `"${notWorkingCount || 0}"`,
            `"${residentialCount || 0}"`,
            `"${callbackCount || 0}"`,
            `"${doNotCallCount || 0}"`,
            `"${noAnswerCount || 0}"`,
            `"${notInterested || 0}"`,
            `"${voicemailCount || 0}"`
        ];

        const unassignedRows = unassignedLeads.map(unassigned => [
            '', '', '', '', // Empty fields for the total values
            `"${unassigned.name || ''}"`,
            `"${unassigned.city || ''}"`,
            `"${unassigned.type || ''}"`,
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
        ]);

        const csvContent = [
            reportHeader.join(','), // Add the report header row
            csvHeaders.join(','),
            totalRow.join(','),
            ...unassignedRows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `dashboard_report_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle={`as of ${formattedDate}`} />

                <Box>
                    <Button
                        onClick={handleDownloadReports}
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
                        title={bookedUnits.assignedLeadStatus}
                        subtitle="Lead Status"
                        progress={bookedUnits.totalAssignedLeads - bookedUnits.assignedLeadsAvailable}
                        increase={`${statusIncrease}%`}
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
                        title={bookedUnits.assignedYesterday}
                        subtitle="Assigned Yesterday"
                        progress={bookedUnits.assignedYesterday}
                        increase={bookedUnits.assignedYesterday}
                        icon={
                            <PeopleOutlined
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
                        title={bookedUnits.assignedLeadsAvailable}
                        subtitle="Leads Available"
                        progress={bookedUnits.totalAssignedLeads - bookedUnits.assignedLeadStatus}
                        increase={`${availableIncrease}%`}
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
                        title={bookedUnits.totalAssignedLeads}
                        subtitle="Total Assigned Leads"
                        progress={totalLeadsProgress}
                        increase={`${totalLeadsIncrease}%`}
                        icon={
                            <AssignmentIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor="#101624"
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" color="#e0e0e0">
                        New Assigned Leads
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" progress={bookedUnits.assignedDaily} showText={true} text={bookedUnits.assignedDaily} />
                        <Typography
                            variant="h5"
                            color="#4cceac"
                            sx={{ mt: "15px" }}
                        >
                            Assigned Leads Daily
                        </Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 9"
                    gridRow="span 3"
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
                            Recent Assigned Leads
    </Typography>
                    </Box>
                    {unassignedLeads.map((unassigned) => (
                        <Box
                            key={unassigned._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid #1F2A40`}
                            p="15px"
                        >
                            <Box flex={1}>
                                <Typography color="#e0e0e0" fontSize="17px">
                                    {unassigned.name}
                                </Typography>
                            </Box>
                            <Box flex={1} color="#e0e0e0" fontSize="17px">{unassigned.city}</Box>
                            <Box
                                flex={1}
                                backgroundColor="#4cceac"
                                p="5px 10px"
                                borderRadius="4px"
                                textAlign="center"
                                maxWidth="100px" // Adjust the width as needed
                            >
                                {unassigned.type}
                            </Box>
                            <Box flex={1} textAlign="right">
                                <Typography color="#e0e0e0" variant="body2" fontSize="17px">
                                    {moment(unassigned.Distributed).format('MMM D, YYYY h:mm A')}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 3"
                    gridRow="span 6"
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
                            Types Received
                    </Typography>
                    </Box>
                    {bookedUnits.typesReceived &&
                        Object.entries(bookedUnits.typesReceived).map(([type, count]) => (
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
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor="#101624"
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" color="#e0e0e0">
                        Emails Sent
          </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" progress={bookedUnits.emailsSent} showText={true} text={bookedUnits.emailsSent} />
                        <Typography
                            variant="h5"
                            color="#4cceac"
                            sx={{ mt: "15px" }}
                        >
                            emails generated
            </Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor="#101624"
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" color="#e0e0e0">
                        Booked
          </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" progress={bookedCount} showText={true} text={bookedCount} />
                        <Typography
                            variant="h5"
                            color="#4cceac"
                            sx={{ mt: "15px" }}
                        >
                            booked generated
            </Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor="#101624"
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" color="#e0e0e0">
                        Warm Lead
          </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" progress={warmLeadCount} showText={true} text={warmLeadCount} />
                        <Typography
                            variant="h5"
                            color="#4cceac"
                            sx={{ mt: "15px" }}
                        >
                            warm lead generated
            </Typography>
                    </Box>
                </Box>

                {/* ROW 4 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={notEligibleCount}
                        subtitle="Not Eligible"
                        progress={notEligibleCount}
                        increase={`${notEligibleIncrease}%`}
                        icon={
                            <NotInterestedIcon
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
                        title={alreadyInstalledCount}
                        subtitle="Already Installed"
                        progress={alreadyInstalledCount}
                        increase={`${installedIncrease}%`}
                        icon={
                            <DoneAllRoundedIcon
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
                        title={notWorkingCount}
                        subtitle="Wrong / Not Working"
                        progress={notWorkingCount}
                        increase={`${wrongIncrease}%`}
                        icon={
                            <ErrorRoundedIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 5 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={callbackCount}
                        subtitle="Callback"
                        progress={callbackCount}
                        increase={`${callBackIncrease}%`}
                        icon={
                            <PhoneCallbackRoundedIcon
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
                        title={doNotCallCount}
                        subtitle="Do Not Call"
                        progress={doNotCallCount}
                        increase={`${doNotCallIncrease}%`}
                        icon={
                            <PhoneMissedRoundedIcon
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
                        title={noAnswerCount}
                        subtitle="No Answer"
                        progress={noAnswerCount}
                        increase={`${noAnswerIncrease}%`}
                        icon={
                            <PhoneDisabledRoundedIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 6 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor="#0a2538"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={notInterested}
                        subtitle="Not Interested"
                        progress={notInterested}
                        increase={`${notInterestedIncrease}%`}
                        icon={
                            <ThumbDownIcon
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
                        title={voicemailCount}
                        subtitle="Voicemail"
                        progress={voicemailCount}
                        increase={`${voicemailIncrease}%`}
                        icon={
                            <VoicemailIcon
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
                        title={residentialCount}
                        subtitle="Residential"
                        progress={residentialCount}
                        increase={`${residentialIncrease}%`}
                        icon={
                            <HouseIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AGDashboardTabs;
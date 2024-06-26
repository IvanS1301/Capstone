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

const DashboardTabs = ({ inventory, recentBookings }) => {

    /** --- CALL DISPOSITION COUNTS --- */
    const bookedCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Booked"] || 0 : 0;
    const warmLeadCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Warm Lead"] || 0 : 0;
    const notEligibleCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Not Eligible"] || 0 : 0;
    const alreadyInstalledCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Already Installed"] || 0 : 0;
    const notWorkingCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Wrong/Not Working"] || 0 : 0;
    const residentialCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Residential"] || 0 : 0;
    const callbackCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Callback"] || 0 : 0;
    const doNotCallCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Do Not Call"] || 0 : 0;
    const noAnswerCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["No Answer"] || 0 : 0;
    const notInterested = inventory.callDispositionCounts ? inventory.callDispositionCounts["Not Interested"] || 0 : 0;
    const voicemailCount = inventory.callDispositionCounts ? inventory.callDispositionCounts["Voicemail"] || 0 : 0;

    /** --- PROGRESS CIRCLE FORMAT --- */
    const totalUsersProgress = (inventory.numberOfUsers / inventory.numberOfUsers) * 100;
    const totalLeadsProgress = (inventory.numberOfLeads / inventory.numberOfLeads) * 100;

    /** --- INCREASE FORMAT PERCENTAGE --- */
    const assignedLeadsIncrease = ((inventory.numberOfLeads - inventory.numberOfUnassignedLeads) / inventory.numberOfLeads * 100).toFixed(2);
    const unassignedLeadsIncrease = ((inventory.numberOfLeads - inventory.numberOfAssignedLeads) / inventory.numberOfLeads * 100).toFixed(2);
    const totalLeadsIncrease = ((inventory.numberOfLeads / inventory.numberOfLeads) * 100).toFixed(2);
    const totalUsersIncrease = ((inventory.numberOfUsers / inventory.numberOfUsers) * 100).toFixed(2);
    const notEligibleIncrease = ((notEligibleCount / inventory.numberOfLeads) * 100).toFixed(2);
    const installedIncrease = ((alreadyInstalledCount / inventory.numberOfLeads) * 100).toFixed(2);
    const wrongIncrease = ((notWorkingCount / inventory.numberOfLeads) * 100).toFixed(2);
    const callBackIncrease = ((callbackCount / inventory.numberOfLeads) * 100).toFixed(2);
    const doNotCallIncrease = ((doNotCallCount / inventory.numberOfLeads) * 100).toFixed(2);
    const noAnswerIncrease = ((noAnswerCount / inventory.numberOfLeads) * 100).toFixed(2);
    const notInterestedIncrease = ((notInterested / inventory.numberOfLeads) * 100).toFixed(2);
    const voicemailIncrease = ((voicemailCount / inventory.numberOfLeads) * 100).toFixed(2);
    const residentialIncrease = ((residentialCount / inventory.numberOfLeads) * 100).toFixed(2);

    /** --- HEADER SUBTITLE FORMAT --- */
    const formattedDate = moment(inventory.updatedAt).format('MMMM Do YYYY, h:mm:ss a');

    /** --- DOWNLOAD REPORTS AS CSV FILE --- */
    const handleDownloadReports = () => {
        const csvHeaders = [
            'Total Leads',
            'Total Users',
            'Assigned Leads',
            'Unassigned Leads',
            'Telemarketer Name',
            'Lead Name',
            'Call Disposition',
            'Number of Emails',
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
            `"${inventory.numberOfLeads || 0}"`,
            `"${inventory.numberOfUsers || 0}"`,
            `"${inventory.numberOfAssignedLeads || 0}"`,
            `"${inventory.numberOfUnassignedLeads || 0}"`,
            '', '', '', // Empty fields for telemarketerName, leadName, and callDisposition
            `"${inventory.numberOfEmails || 0}"`,
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

        const bookingRows = recentBookings.map(booking => [
            '', '', '', '', // Empty fields for the total values
            `"${booking.telemarketerName || ''}"`,
            `"${booking.leadName || ''}"`,
            `"${booking.callDisposition || ''}"`,
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
        ]);

        const csvContent = [
            reportHeader.join(','), // Add the report header row
            csvHeaders.join(','),
            totalRow.join(','),
            ...bookingRows.map(row => row.join(','))
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
                        title={inventory.numberOfLeads}
                        subtitle="Total Leads"
                        progress={totalLeadsProgress}
                        increase={`${totalLeadsIncrease}%`}
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
                        title={inventory.numberOfUsers}
                        subtitle="Total Users"
                        progress={totalUsersProgress}
                        increase={`${totalUsersIncrease}%`}
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
                        title={inventory.numberOfAssignedLeads}
                        subtitle="Assigned Leads"
                        progress={inventory.numberOfLeads - inventory.numberOfUnassignedLeads}
                        increase={`${assignedLeadsIncrease}%`}
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
                        title={inventory.numberOfUnassignedLeads}
                        subtitle="Available Leads"
                        progress={inventory.numberOfLeads - inventory.numberOfAssignedLeads}
                        increase={`${unassignedLeadsIncrease}%`}
                        icon={
                            <AssignmentIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}

                <Box
                    gridColumn="span 4"
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
                        <ProgressCircle size="125" progress={inventory.numberOfEmails} showText={true} text={inventory.numberOfEmails} />
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
                    gridColumn="span 4"
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
                    gridColumn="span 4"
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

                {/* ROW 3 */}
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
                            Types Created
                    </Typography>
                    </Box>
                    {inventory.typeCounts &&
                        Object.entries(inventory.typeCounts).map(([type, count]) => (
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

                {/* ROW 4 */}
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

                {/* ROW 5 */}
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

                {/* ROW 6 */}
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
                            Recent Bookings
    </Typography>
                    </Box>
                    {recentBookings.map((booking) => (
                        <Box
                            key={booking._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid #1F2A40`}
                            p="15px"
                        >
                            <Box flex={1}>
                                <Typography color="#e0e0e0" fontSize="17px">
                                    {booking.telemarketerName}
                                </Typography>
                            </Box>
                            <Box flex={2} color="#e0e0e0" fontSize="17px">{booking.leadName}</Box>
                            <Box
                                flex={1}
                                backgroundColor="#4cceac"
                                p="5px 10px"
                                borderRadius="4px"
                                textAlign="center"
                                maxWidth="100px" // Adjust the width as needed
                            >
                                {booking.callDisposition}
                            </Box>
                            <Box flex={1} textAlign="right">
                                <Typography color="#e0e0e0" variant="body2" fontSize="17px">
                                    {moment(booking.createdAt).format('MMM D, YYYY h:mm A')}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box>
    );
};

export default DashboardTabs;
import { useContext } from "react";
import { ColorModeContext } from "../../theme";

/** --- MATERIAL UI --- */
import { Box, IconButton, useTheme } from "@mui/material";

/** --- MATERIAL UI ICONS --- */
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const AgentNavbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor="#1F2A40"
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1, color: "#e0e0e0" }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon sx={{ color: "#e0e0e0" }} />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode} sx={{ color: "#e0e0e0" }}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                            <LightModeOutlinedIcon />
                        )}
                </IconButton>
                <IconButton sx={{ color: "#e0e0e0" }}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton sx={{ color: "#e0e0e0" }}>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton sx={{ color: "#e0e0e0" }}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AgentNavbar;
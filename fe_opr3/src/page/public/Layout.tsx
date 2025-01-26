import {Box, CssBaseline} from "@mui/material";
import {Sidebar} from "../../component/public/Sidebar";
import React, {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Sidebar/>
            {children}
        </Box>
    );
};
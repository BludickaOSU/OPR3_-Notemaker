import React from 'react';
import {Routes, Route, Navigate, BrowserRouter, Outlet} from 'react-router-dom';
import {NotePage} from './page/note/NotePage';
import RequireAuth from './component/hoc/RequireAuth';
import {UsersPage} from './page/user/UserPage';
import {TopicPage} from './page/topic/TopicPage';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./hooks/queries/queryClient";
import {ThemeProvider} from "@mui/material";
import {appTheme} from "./theme/appTheme";
import links from "./links.json";
import {Layout} from "./page/public/Layout";
import RequireAdmin from "./component/hoc/RequireAdmin";
import {LoginPage} from "./page/public/LoginPage";
import {RegisterPage} from "./page/public/RegisterPage";

const App: React.FC = () => {
    return(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider theme={appTheme}>
                    <Routes>
                        <Route path={links.register} element={<RegisterPage/>} />
                        <Route path={links.login} element={<LoginPage />} />
                        <Route path="*" element={<LoginPage />} />
                        <Route element={<RequireAuth><Outlet /></RequireAuth>}>
                            <Route element={<Layout><Outlet /></Layout>}>
                                <Route path={links.home} element={<NotePage />} />
                                <Route path={links.topic} element={<TopicPage />} />
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route path={links.user} element={<UsersPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App;


/*
<Route element={<RequireAdmin><Outlet /></RequireAdmin>}>
                                    <Route path={links.user} element={<UsersPage />} />
                                </Route>
 */
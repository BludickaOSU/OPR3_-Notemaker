import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/queries/user/useUser';
import { useLoggedUser } from '../../hooks/queries/auth/useAuth';

interface RequireAdminProps {
    children: React.ReactNode;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
    const { data: loggedUser, isLoading: isLoggedUserLoading } = useLoggedUser();
    const userId = loggedUser?.id;
    const { data: user, isLoading: isUserLoading } = useUser(userId?.toString() || '');

    if (isLoggedUserLoading || isUserLoading) {
        return <div>Loading...</div>;
    }

    if (!loggedUser || user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RequireAdmin;
import React from 'react';
import { Navigate } from "react-router-dom";
import { isLogged } from '../service/controller/user';
import Dashboard from '../pages/Dashboard';

export default function AuthMiddleware({ children, guest }) {
    if (guest) {
        return isLogged() ? <Navigate to="/dashboard" state={{ from: location}} /> : children;
    }

    return isLogged() != null ? children : <Navigate to="/dashboard/login" state={{ from: location}} />
}
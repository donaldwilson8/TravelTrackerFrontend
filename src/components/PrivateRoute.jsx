import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const { userId } = useContext(AuthContext);
    return userId ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
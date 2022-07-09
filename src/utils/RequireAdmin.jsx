import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
    let isAdmin = sessionStorage.getItem("isAdmin") === null ? false : true;

    if (!isAdmin) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};
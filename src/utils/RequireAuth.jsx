import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn") === null ? false : true;

    if (!isLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};
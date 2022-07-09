import { Navigate, useParams } from "react-router-dom";

export const RequireIdAuth = ({ children }) => {

    let { accountId } = useParams();
    accountId = accountId.slice(1)
    let isLoggedIn = sessionStorage.getItem("isLoggedIn") === accountId ? true : false;


    if (!isLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};
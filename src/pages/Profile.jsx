import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

export const Profile = () => {
    const param = useParams();
    return (
        <div>My Info {param.accountId}</div>
    )
}


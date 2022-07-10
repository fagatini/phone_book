import { useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { sendGetRequest, sendEditRequest } from "../axios/hooks";
import PhoneRequest from "../components/PhoneRequest/PhoneRequest";
import { useNavigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';
import { AdminAccess } from "../components/AdminAccess/AdminAccess";


export const AdminAccesses = () => {
    const param = useParams();
    const [accesses, setAccesses] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const accessResponse = await sendGetRequest(`/app/admin/accesses`)
            if (accessResponse) {
                setAccesses(accessResponse)
            }
        })()
    }, [])

    const toAllAccPage = () => {
        navigate(`/accounts`)
    }

    const toProfile = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account:${id}`)
    }

    return (
        <div>
            <div className="header">
                <img src={logo} className="logoStyle" alt='' onClick={(e) => toAllAccPage(e)}></img>
                <img src={user} className="logoStyle" alt='' onClick={(e) => toProfile(e)}></img>
            </div>
            <div className="externalBlockVert">
                <div>
                    <div className="ColorStyle divInfo vertBlock">
                        {accesses.map((number, index) => {
                            return (<AdminAccess key={index} access={accesses[index]}></AdminAccess>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

                                // <div key={index}>
                                //     {index !== 0 ? <hr style={{ width: 200 }}></hr> : <></>}
                                //     <PhoneRequest id_access={accesses[index].id_access}>{{ name: Name }}</PhoneRequest>
                                // </div>)
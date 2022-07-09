/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { LitleProfileLine } from '../components/LitleProfileLine/LitleProfileLine'
import { sendGetRequest } from "../axios/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';

export const AllAccountsPage = () => {
    const [allAccounts, setAllAccounts] = useState([])
    let navigate = useNavigate();

    const toAllAccPage = () => {
        navigate(`/accounts`)
    }

    const toProfile = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account:${id}`)
    }

    useEffect(() => {
        (
            async () => {
                const response = await sendGetRequest(`/app/accounts`)
                if (response) {
                    let id = sessionStorage.getItem("isLoggedIn")
                    response.splice(id - 1, 1)
                    setAllAccounts(response)
                }
            }
        )()
    }, [])

    return (
        <div>
            <div className="header">
                <img src={logo} className="logoStyle" alt='' onClick={(e) => toAllAccPage()}></img>
                <img src={user} className="logoStyle" alt='' onClick={(e) => toProfile()}></img>
            </div>
            <div className="externalBlockVert">
                <div>
                    {allAccounts.map((number, index) => (<div key={index} style={{ padding: 11 }}><LitleProfileLine Account={allAccounts[index]} /></div>)
                    )}
                </div>
            </div >
        </div>
    )
}
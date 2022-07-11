/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { LitleProfileLine } from '../components/LitleProfileLine/LitleProfileLine'
import { sendGetRequest } from "../axios/hooks";
import { useNavigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';
import { LittleDelProfileLine } from '../components/LittleDelProfileLine/LittleDelProfileLine';

export const AdminDeletedAccs = () => {
    const [deletedAccounts, setDeletedAccounts] = useState([])
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
                const response = await sendGetRequest(`/app/admin/accounts`)
                console.log(response)
                if (response) {
                    setDeletedAccounts(response)
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
                    {deletedAccounts.map((number, index) => (<div key={index} style={{ padding: 11 }}><LittleDelProfileLine Account={deletedAccounts[index]} /></div>)
                    )}
                </div>
            </div >
        </div>
    )
}
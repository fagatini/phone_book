/* eslint-disable no-unused-vars */
import React from 'react'
import Button from '../Button/Button'
import { sendEditRequest } from "../../axios/hooks";
import { useState, useRef } from 'react'
import AdminAccessStyle from './AdminAccessStyle.css'

export const AdminAccess = ({ access, ...props }) => {
    const acceptButton = useRef(null)
    const rejectButton = useRef(null)
    const awaitButton = useRef(null)

    let recName = access.first_name + ' ' + access.second_name
    let givName = access.recfn + ' ' + access.recsn

    const handleOnClick = async (state) => {
        if (state === 'accepted') {
            acceptButton.current.style.borderColor = 'green'
            awaitButton.current.style.borderColor = ''
            rejectButton.current.style.borderColor = ''
        }
        else if (state === 'rejected') {
            rejectButton.current.style.borderColor = 'green'
            awaitButton.current.style.borderColor = ''
            acceptButton.current.style.borderColor = ''
        }
        else {
            awaitButton.current.style.borderColor = 'green'
            rejectButton.current.style.borderColor = ''
            acceptButton.current.style.borderColor = ''
        }
        const response = await sendEditRequest(`/app/account/access`, { id_access: access.id_access, state: state })
    }

    return (
        <div className='ColorStyle accessBlock'>
            <div>{recName} requested access from {givName}</div>
            <div>state: {access.state}</div>
            <div>was requested {access.data.slice(0, 10)}</div>
            <div className="AppWrapperHor" style={{ padding: 11 }}>
                <Button ref={acceptButton} onClick={(e) => handleOnClick('accepted')}>accept</Button>
                <Button ref={rejectButton} onClick={(e) => handleOnClick('rejected')}>reject</Button>
                <Button ref={awaitButton} onClick={(e) => handleOnClick('аwaiting')}>await</Button>
            </div>

        </div>
    )
}
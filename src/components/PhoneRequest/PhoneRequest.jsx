/* eslint-disable no-unused-vars */
import React from 'react'
import Button from '../Button/Button'
import { sendEditRequest } from "../../axios/hooks";
import { useState, useRef } from 'react'

const PhoneRequest = ({ id_access, children, ...props }) => {
    const acceptButton = useRef(null)
    const rejectButton = useRef(null)
    const handleOnClick = async (state) => {
        if (state === 'accepted') {
            acceptButton.current.style.borderColor = 'green'
            rejectButton.current.style.borderColor = ''
        }
        else {
            rejectButton.current.style.borderColor = 'green'
            acceptButton.current.style.borderColor = ''
        }
        const response = await sendEditRequest(`/app/account/access`, { id_access: id_access, state: state })
    }

    return (
        <div>
            <div className="divInfo" style={{ maxWidth: 350 }}>{children.name} has requested access to your phone numbers</div>
            <div className="AppWrapperHor" style={{ padding: 11 }}>
                <Button ref={acceptButton} onClick={(e) => handleOnClick('accepted')}>accept</Button>
                <Button ref={rejectButton} onClick={(e) => handleOnClick('rejected')}>reject</Button>
            </div>
        </div>
    )
}
export default PhoneRequest
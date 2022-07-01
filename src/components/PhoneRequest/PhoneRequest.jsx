/* eslint-disable no-unused-vars */
import React from 'react'
import Button from '../Button/Button'
// import { ButtonStyle } from './ButtonStyle.css'

const PhoneRequest = ({ acceptOnClick, rejectOnClick, children, ...props }) => {
    return (
        <div>
            <div className="divInfo" style={{ maxWidth: 350 }}>{children.name} has requested access to your phone numbers</div>
            <div className="AppWrapperHor" style={{ padding: 11 }}>
                <Button onClick={acceptOnClick}>accept</Button>
                <Button onClick={rejectOnClick}>reject</Button>
            </div>
        </div>
    )
}
export default PhoneRequest
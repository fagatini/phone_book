/* eslint-disable no-unused-vars */
import React from 'react'
import PhoneDataProfileStyle from './PhoneDataProfileStyle.css'

export const PhoneDataProfile = ({ children }) => {
    return (
        <div className="ColorStyle PhoneBlock">
            <div className="divInfo" style={{ justifyContent: 'center' }}>work phone: {children.workPhoneNum}</div>
            <div style={{ overflow: 'auto', maxHeight: 144 }}>
                {children.phoneNumber.map((number, index) => (
                    <div key={index}>
                        <hr style={{ width: 100 }}></hr>
                        <div className="divInfo" style={{ justifyContent: 'center' }}>personal phone {index + 1}) {children.phoneNumber[index]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
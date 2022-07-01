/* eslint-disable no-unused-vars */
import React from 'react'
import { SubDataProfileStyle } from './SubDataProfileStyle.css'

export const SubDataProfile = ({ children }) => {
    return (
        <div className="subDataBlock ColorStyle">
            <div className='divInfo'>email: {children.email}</div>
            <hr style={{ width: 100 }}></hr>
            <div className='divInfo'>department: {children.workData.department}</div>
            <hr style={{ width: 100 }}></hr>
            <div className='divInfo'>post: {children.workData.post}</div>
            <hr style={{ width: 100 }}></hr>
            <div className='divInfo'>workplace: {children.workData.workPlace}</div>
            <hr style={{ width: 100 }}></hr>
            <div className='divInfo'>about me: {children.aboutMe}</div>
        </div >
    )
}
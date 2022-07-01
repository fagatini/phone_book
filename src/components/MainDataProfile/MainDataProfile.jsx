/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { MainDataProfileStyle } from './MainDataProfileStyle.css'

export const MainDataProfile = ({ isShowBd, children }) => {
    return (
        <div className="mainDataBlock">
            <img src={children.photoSrc} className='pictureSize ColorStyle' alt=''></img>
            <div className="vertBlock ColorStyle">
                <div className='divInfo' style={{ justifyContent: 'center' }} > {children.FCs.firstName} {children.FCs.midleName} {children.FCs.secondName}</div>
                <hr style={{ width: 100 }}></hr>
                <div className='divInfo' style={{ justifyContent: 'center' }}> {children.birthdate} {isShowBd ? (<div>(show)</div>) : (<div>(not show)</div>)}</div>
            </div >
        </div >
    )
}



/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { LittleDelProfileLineStyle } from './LittleDelProfileLineStyle.css'
import profile from '../../pictures/profile.png';
import undelete from '../../pictures/undelete.jpg';
import { sendEditRequest } from "../../axios/hooks";

export const LittleDelProfileLine = ({ Account }) => {
    const bordersElem = useRef(null)
    const returnFromDel = async () => {
        bordersElem.current.style.borderColor = 'green'
        await sendEditRequest(`/app/account/:${Account.id_person}`, { "state": false })
    }

    return (
        <div className="ColorStyle horBlock profileBoxDel" ref={bordersElem}>
            <div className='horBlock'>
                <img src={Account.photo_url || profile} className='pictureSizeLittleLine' alt=''></img>
                <div className='divInfo'> {Account.second_name} {Account.first_name} {Account.midle_name}</div>
            </div>
            <img src={undelete} className='pictureSizeLittleLine' alt='' onClick={(e) => returnFromDel()}></img>
        </div >
    )
}



/* eslint-disable no-unused-vars */
import React from 'react'
import { LitleProfileLineStyle } from './LitleProfileLineStyle.css'
import profile from '../../pictures/profile.png';
import arrow from '../../pictures/right-arrow.png';
import { useNavigate } from "react-router-dom";

export const LitleProfileLine = ({ Account }) => {
    let navigate = useNavigate();

    const toNotMyProfile = () => {
        navigate(`:${Account.id_person}`)
    }

    return (
        <div className="ColorStyle horBlock profileBox">
            <div className='horBlock'>
                <img src={Account.photo_url || profile} className='pictureSizeLittleLine' alt=''></img>
                <div className='divInfo'> {Account.second_name} {Account.first_name} {Account.midle_name}</div>
            </div>
            <img src={arrow} className='pictureSizeLittleLine' alt='' onClick={(e) => toNotMyProfile()}></img>
        </div >
    )
}



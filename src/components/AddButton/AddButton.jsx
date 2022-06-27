/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { AddButtonStyle } from './AddButtonStyle.css'
const AddButton = ({ src, onClick, ...props }) => {
    return (
        <div className='AddBWrapper'>
            <button className='AddButtonStyle' onClick={onClick} {...props}>
                <img className='imgStyleAdd' src={src} alt=''></img>
            </button>
        </div>
    )
}
export default AddButton


/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { ChangeVievButtonStyle } from './ChangeVievButtonStyle.css'
const ChangeVievButton = ({ isUsed, srcNotUsed, srcIsUsed, onClick, ...props }) => {
    if (!isUsed) {
        return (
            // <button  scr={srcNotUsed} {...props} ></button>
            <button className='ChangeVievButtonStyle' onClick={onClick} {...props}>
                <img className='imgStyle' src={srcNotUsed} alt=''></img>
            </button>
        )
    }
    else {
        return (
            // <button className='ChangeVievButtonStyle'{...props} scr={srcIsUsed} >
            <button className='ChangeVievButtonStyle' onClick={onClick} {...props}>
                <img className='imgStyle' src={srcIsUsed} alt=''></img>
            </button>
        )
    }
}
export default ChangeVievButton


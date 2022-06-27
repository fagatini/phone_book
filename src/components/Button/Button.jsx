/* eslint-disable no-unused-vars */
import React from 'react'
import { ButtonStyle } from './ButtonStyle.css'

const Button = ({ children, ...props }) => {
    return (
        <button type="button" {...props} className='ButtonStyle ColorStyle'>
            {children}
        </button>
    )
}
export default Button


/* eslint-disable no-unused-vars */
import React from 'react'
import { ButtonStyle } from './ButtonStyle.css'

const Button = React.forwardRef(({ children, ...props }, ref) => {
    return (
        <button type="button" {...props} className='ButtonStyle ColorStyle' ref={ref}>
            {children}
        </button>
    )
})
export default Button


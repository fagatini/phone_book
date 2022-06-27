/* eslint-disable no-unused-vars */
import React from 'react'
import { InputStyle } from './InputStyle.css'

const Input = React.forwardRef((props, ref) => {
    return (
        <input {...props} className='InputStyle ColorStyle' ref={ref}></input>
    )
})
export default Input

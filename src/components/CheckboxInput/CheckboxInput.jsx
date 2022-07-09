/* eslint-disable no-unused-vars */
import React from 'react'

const CheckboxInput = ({ state, setState, children, ...props }) => {
    return (
        <div className='horBlock' style={{ paddingBottom: 11 }}>
            <input className='ColorStyle' type='checkbox' checked={state} onChange={(e) => { setState(!state) }}></input>
            <div>{children}</div>
        </div>
    )
}
export default CheckboxInput
/* eslint-disable no-unused-vars */
import React from 'react'

export const Selector = ({ options, defaultVal, value, onChange }) => {
    return (
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            <option value={''}>{defaultVal} </option>
            {options.map((number, index) =>
                (<option key={index} value={options[index].value}>{options[index].name} </option>)
            )}
        </select>
    )
}

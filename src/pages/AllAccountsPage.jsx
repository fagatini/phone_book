/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { LitleProfileLine } from '../components/LitleProfileLine/LitleProfileLine'
import { sendGetRequest } from "../axios/hooks";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';

export const AllAccountsPage = () => {
    const maxElems = 6
    const [allAccounts, setAllAccounts] = useState([])
    const [showedAccounts, setShowedAccounts] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [nameInput, setNameInput] = useState('')
    const [secnameInput, setSecnameInput] = useState('')
    const [pageCount, setPageCount] = useState(0)

    const searchedAccs = useMemo(() => {
        let selectedAccs = []
        if (!nameInput) {
            selectedAccs = allAccounts.filter(account => account.second_name.includes(secnameInput))
        }
        else if (!secnameInput) {
            selectedAccs = allAccounts.filter(account => account.first_name.includes(nameInput))
        }
        else {
            selectedAccs = allAccounts.filter(account => account.second_name.includes(secnameInput) && account.first_name.includes(nameInput))
        }
        setPageCount(Math.ceil(selectedAccs.length / maxElems))
        return selectedAccs
    }, [allAccounts, nameInput, secnameInput])

    const pageChooseArray = useMemo(() => {
        if (pageCount > 4) {
            if (pageNum <= 3) {
                return [1, 2, 3, 4, 0, pageCount]
            }
            else if (pageNum >= pageCount - 2) {
                return [1, 0, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
            }
            if (pageNum > 3 && pageNum < pageCount - 1) {
                return [1, 0, pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2, 0, pageCount]
            }
        } else {
            let tmp = []
            for (let i = 0; i < pageCount; i++)
                tmp.push(i + 1)
            return tmp
        }
    }, [pageCount, pageNum])

    let navigate = useNavigate();

    useEffect(() => {
        let showed = searchedAccs
        showed = showed.slice((pageNum - 1) * maxElems, pageNum * maxElems)
        setShowedAccounts(showed)
    }, [pageNum, searchedAccs])

    const toAllAccPage = () => {
        navigate(`/accounts`)
    }

    const toProfile = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account:${id}`)
    }

    useEffect(() => {
        (
            async () => {
                const response = await sendGetRequest(`/app/accounts`)
                if (response) {
                    let id = sessionStorage.getItem("isLoggedIn")
                    response.splice(id - 1, 1)
                    setAllAccounts(response)
                    setPageCount(Math.ceil(response.length / maxElems))
                }
            }
        )()
    }, [])

    return (
        <div>
            <div className="header">
                <img src={logo} className="logoStyle" alt='' onClick={(e) => toAllAccPage()}></img>
                <img src={user} className="logoStyle" alt='' onClick={(e) => toProfile()}></img>
            </div>
            <div className="externalBlockVert" style={{ height: 'fit-content' }}>
                <div className='horBlock' style={{ justifyContent: 'space-between', width: '479px', paddingTop: 11 }}>
                    <Input placeholder='first name' value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ width: 220 }}></Input>
                    <Input placeholder='second name' value={secnameInput} onChange={(e) => setSecnameInput(e.target.value)} style={{ width: 220 }}></Input>
                </div>
                <div>
                    {showedAccounts.map((number, index) => (<div key={index} style={{ padding: 11 }}><LitleProfileLine Account={showedAccounts[index]} /></div>)
                    )}
                </div>
                <div className='horBlock'>
                    {pageChooseArray.map((number, index) => {
                        if (pageChooseArray[index] === 0) {
                            return (<div key={index}>...</div>)
                        }
                        else {
                            return (<button
                                value={pageNum}
                                onClick={(e) => setPageNum(pageChooseArray[index])}
                                key={index}>
                                {pageChooseArray[index]}
                            </button>)
                        }
                    })}
                </div>
            </div >
        </div>
    )
}
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { sendGetRequest } from "../axios/hooks";
import { useNavigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';
import { AdminAccess } from "../components/AdminAccess/AdminAccess";
import { Selector } from "../components/Selector/Selector";
import { useMemo } from "react";


export const AdminAccesses = () => {
    const [accesses, setAccesses] = useState([])
    const [searchState, setSearchState] = useState('')
    const [sortParam, serSortParam] = useState('')

    const sortedAccesses = useMemo(() => {
        if (sortParam) {
            return [...accesses].sort((a, b) => a[sortParam].localeCompare(b[sortParam]))
        }
        return accesses
    }, [sortParam, accesses])

    const searchedAccesses = useMemo(() => {
        if (searchState) {
            return sortedAccesses.filter(access => access.state === searchState)
        }
        return sortedAccesses
    }, [sortedAccesses, searchState])

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const accessResponse = await sendGetRequest(`/app/admin/accesses`)
            if (accessResponse) {
                setAccesses(accessResponse)
            }
        })()
    }, [])

    const toAllAccPage = () => {
        navigate(`/accounts`)
    }

    const toProfile = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account:${id}`)
    }

    return (
        <div>
            <div className="header">
                <img src={logo} className="logoStyle" alt='' onClick={(e) => toAllAccPage(e)}></img>
                <img src={user} className="logoStyle" alt='' onClick={(e) => toProfile(e)}></img>
            </div>
            <div className="externalBlockVert" style={{ height: 'fit-content', padding: 11 }}>
                <div>
                    <Selector
                        defaultVal={'by id'}
                        options={[
                            { value: 'data', name: 'by date' },
                            { value: 'recsn', name: 'by reciever sn' },
                            { value: 'second_name', name: 'by giver sn' },
                        ]}
                        value={sortParam}
                        onChange={(e) => serSortParam(e)}>
                    </Selector>
                    <Selector
                        defaultVal={'all states'}
                        options={[
                            { value: 'аwaiting', name: 'аwaiting' },
                            { value: 'rejected', name: 'rejected' },
                            { value: 'accepted', name: 'accepted' },
                        ]}
                        value={searchState}
                        onChange={(e) => setSearchState(e)}>
                    </Selector>
                </div>
                <div>
                    <div className="divInfo vertBlock">
                        {searchedAccesses.map((number, index) => {
                            return (<AdminAccess key={index} access={searchedAccesses[index]}></AdminAccess>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
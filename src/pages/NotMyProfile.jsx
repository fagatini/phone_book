import React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sendGetRequest, sendPostRequest } from "../axios/hooks";
import { MainDataProfile } from "../components/MainDataProfile/MainDataProfile";
import { SubDataProfile } from "../components/SubDataProfile/SubDataProfile";
import { PhoneDataProfile } from "../components/PhoneDataProfile/PhoneDataProfile";
import { useNavigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';
import profile from '../pictures/profile.png';
import Button from "../components/Button/Button";


export const NotMyProfile = () => {
    const param = useParams();
    const [authData, setAuthData] = useState({ email: '', password: '' })
    const [mainData, setMainData] = useState({ firstName: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '' })
    const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });
    const [options, setOptions] = useState({ isAccDeleted: false, isShowBirthdate: true, isShowNums: false })
    const [phoneNumber, setPhoneNumber] = useState([])
    const [accessState, setAccessState] = useState('')
    const requestButton = useRef(null)

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await sendGetRequest(`/app/account/${param.accountId}`)
            if (response) {
                let birthDate = response.mainInfo.birthdate.slice(0, 10)
                if (!response.mainInfo.is_show_bd) {
                    birthDate = '****'.concat(birthDate.slice(4, 10))
                }
                setAuthData({ email: response.mainInfo.email, password: response.mainInfo.password })
                setMainData({ firstName: response.mainInfo.first_name, midleName: response.mainInfo.midle_name, secondName: response.mainInfo.second_name, birthDate: birthDate, workPhoneNum: response.mainInfo.job_phone_num })
                setSubData({ department: response.mainInfo.department, post: response.mainInfo.post, workPlace: response.mainInfo.workplace, aboutMe: response.mainInfo.about_me, photoURL: response.mainInfo.photo_url ? response.mainInfo.photo_url : profile })
                setPhoneNumber(response.phoneNumbers.map((number, index) => response.phoneNumbers[index].phone_number))

                setOptions({ isAccDeleted: response.mainInfo.is_deleted_acc, isShowBirthdate: response.mainInfo.is_show_bd, isShowNums: response.mainInfo.is_show_num })
                let id = sessionStorage.getItem("isLoggedIn")
                const accessResponse = await sendPostRequest(`/app/account/access/${param.accountId}`, { id_giver: id })
                if (accessResponse) {
                    setAccessState(accessResponse.state)
                }
            }
        })()
    }, [param.accountId])

    const toAllAccPage = () => {
        navigate(`/accounts`)
    }

    const toProfile = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account:${id}`)
    }

    const requestAccess = async () => {
        let id = sessionStorage.getItem("isLoggedIn")
        setAccessState('аwaiting')
        const accessResponse = await sendPostRequest(`app/accounts/access/${param.accountId}`, { "id_giver": id, "id_reciver": param.accountId.slice(1) })
    }

    return (
        <div>
            <div className="header">
                <img src={logo} className="logoStyle" alt='' onClick={(e) => toAllAccPage(e)}></img>
                <img src={user} className="logoStyle" alt='' onClick={(e) => toProfile(e)}></img>
            </div>
            <div className="externalBlock">
                <div className="dataWrapper">
                    <div className="vertBlock">
                        <MainDataProfile isShowBd={options.isShowBirthdate}>{{ photoSrc: subData.photoURL, birthdate: mainData.birthDate, FCs: { firstName: mainData.firstName, midleName: mainData.midleName, secondName: mainData.secondName } }}</MainDataProfile>
                        {options.isShowNums || accessState === 'accepted' ? <PhoneDataProfile>{{ workPhoneNum: mainData.workPhoneNum, phoneNumber: phoneNumber }}</PhoneDataProfile>
                            : <div className="ColorStyle divInfo vertBlock" style={{ alignItems: 'center' }}>
                                <div style={{ padding: 11 }}>Numbers are hide by owner</div>
                                {accessState === 'notExist' ? <Button ref={requestButton} onClick={() => requestAccess()}>request access</Button> : <div className="ColorStyle" style={{ padding: 9 }}>{accessState}</div>}
                            </div>}
                    </div>
                    <div className="vertBlock">
                        <SubDataProfile>{{ email: authData.email, workData: { department: subData.department, post: subData.post, workPlace: subData.workPlace }, aboutMe: subData.aboutMe }}</SubDataProfile>
                    </div>
                </div>
            </div>
        </div >
    )
}
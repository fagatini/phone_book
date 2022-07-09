import { useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { sendGetRequest, sendEditRequest } from "../axios/hooks";
import { MainDataProfile } from "../components/MainDataProfile/MainDataProfile";
import { SubDataProfile } from "../components/SubDataProfile/SubDataProfile";
import { PhoneDataProfile } from "../components/PhoneDataProfile/PhoneDataProfile";
import PhoneRequest from "../components/PhoneRequest/PhoneRequest";
import { useNavigate } from "react-router-dom";
import logo from '../pictures/logo.png';
import user from '../pictures/user.png';
import deletePic from '../pictures/delete.png';
import edit from '../pictures/edit.png';
import profile from '../pictures/profile.png';


export const Profile = () => {
    const param = useParams();
    const [authData, setAuthData] = useState({ email: '', password: '' })
    const [mainData, setMainData] = useState({ firstName: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '' })
    const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });
    const [options, setOptions] = useState({ isAccDeleted: false, isShowBirthdate: true, isShowNums: true })
    const [phoneNumber, setPhoneNumber] = useState([])
    const [accesses, setAccesses] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await sendGetRequest(`/app/account/${param.accountId}`)
            if (response) {
                setAuthData({ email: response.mainInfo.email, password: response.mainInfo.password })
                setMainData({ firstName: response.mainInfo.first_name, midleName: response.mainInfo.midle_name, secondName: response.mainInfo.second_name, birthDate: response.mainInfo.birthdate.slice(0, 10), workPhoneNum: response.mainInfo.job_phone_num })
                setSubData({ department: response.mainInfo.department, post: response.mainInfo.post, workPlace: response.mainInfo.workplace, aboutMe: response.mainInfo.about_me, photoURL: response.mainInfo.photo_url ? response.mainInfo.photo_url : profile })
                setPhoneNumber(response.phoneNumbers.map((number, index) => response.phoneNumbers[index].phone_number))
                setOptions({ isAccDeleted: response.is_deleted_acc, isShowBirthdate: response.is_show_bd, isShowNums: response.is_show_num })
                const accessResponse = await sendGetRequest(`/app/account/access/${param.accountId}`)
                if (accessResponse) {
                    setAccesses(accessResponse)
                }
            }

        })()
    }, [param.accountId])

    const DeleteAcc = async () => {
        await sendEditRequest(`/app/account/${param.accountId}`, { "state": true })
    }

    const toEditPage = () => {
        let id = sessionStorage.getItem("isLoggedIn")
        navigate(`/account/edit/:${id}`)
    }

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
            <div className="externalBlock">
                <div className="dataWrapper">
                    <div className="vertBlock">
                        <MainDataProfile isShowBd={options.isShowBirthdate}>{{ photoSrc: subData.photoURL, birthdate: mainData.birthDate, FCs: { firstName: mainData.firstName, midleName: mainData.midleName, secondName: mainData.secondName } }}</MainDataProfile>
                        <PhoneDataProfile>{{ workPhoneNum: mainData.workPhoneNum, phoneNumber: phoneNumber }}</PhoneDataProfile>
                        <div className="ColorStyle divInfo vertBlock">
                            <div style={{ overflow: 'auto', maxHeight: 296 }}>
                                {accesses.map((number, index) => {
                                    let Name = accesses[index].first_name + ' ' + accesses[index].second_name
                                    return (
                                        <div key={index}>
                                            {index !== 0 ? <hr style={{ width: 200 }}></hr> : <></>}
                                            <PhoneRequest id_access={accesses[index].id_access}>{{ name: Name }}</PhoneRequest>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="vertBlock">
                        <SubDataProfile>{{ email: authData.email, workData: { department: subData.department, post: subData.post, workPlace: subData.workPlace }, aboutMe: subData.aboutMe }}</SubDataProfile>
                        <div className="AppWrapperHor" style={{ padding: 11 }}>
                            <div className="AppWrapperHor" style={{ alignItems: 'center' }}>
                                <img src={deletePic} alt='' onClick={(e) => DeleteAcc()} className="pictureSizeLittleLine"></img>
                                <div>delete account</div>
                            </div>
                            <div className="AppWrapperHor" style={{ alignItems: 'center' }}>
                                <img src={edit} alt='' onClick={(e) => toEditPage()} className="pictureSizeLittleLine"></img>
                                <div>edit account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
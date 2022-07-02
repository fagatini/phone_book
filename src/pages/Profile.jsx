import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { sendGetRequest } from "../axios/hooks";
import { MainDataProfile } from "../components/MainDataProfile/MainDataProfile";
import { SubDataProfile } from "../components/SubDataProfile/SubDataProfile";
import { PhoneDataProfile } from "../components/PhoneDataProfile/PhoneDataProfile";
import PhoneRequest from "../components/PhoneRequest/PhoneRequest";

export const Profile = () => {
    const param = useParams();
    const [authData, setAuthData] = useState({ email: '', password: '' })
    const [mainData, setMainData] = useState({ firstName: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '' })
    const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });
    const [options, setOptions] = useState({ isAccDeleted: false, isShowBirthdate: true, isShowNums: true })
    const [phoneNumber, setPhoneNumber] = useState([])

    useEffect(() => {
        (async () => {
            const response = await sendGetRequest(`/app/account/${param.accountId}`)
            if (response) {
                setAuthData({ email: response.mainInfo.email, password: response.mainInfo.password })
                setMainData({ firstName: response.mainInfo.first_name, midleName: response.mainInfo.midle_name, secondName: response.mainInfo.second_name, birthDate: response.mainInfo.birthdate.slice(0, 10), workPhoneNum: response.mainInfo.job_phone_num })
                setSubData({ department: response.mainInfo.department, post: response.mainInfo.post, workPlace: response.mainInfo.workplace, aboutMe: response.mainInfo.about_me, photoURL: response.mainInfo.photo_url ? response.mainInfo.photo_url : 'http://localhost:3000/static/media/profile.c3f945216dc12c9498dc.png' })
                setPhoneNumber(response.phoneNumbers.map((number, index) => response.phoneNumbers[index].phone_number))
                setOptions({ isAccDeleted: response.is_deleted_acc, isShowBirthdate: response.is_show_bd, isShowNums: response.is_show_num })
            }
        })()
    }, [param.accountId])

    return (
        <div>
            <div className="header"></div>
            <div className="externalBlock">
                <div className="dataWrapper">
                    <div className="vertBlock">
                        <MainDataProfile isShowBd={options.isShowBirthdate}>{{ photoSrc: subData.photoURL, birthdate: mainData.birthDate, FCs: { firstName: mainData.firstName, midleName: mainData.midleName, secondName: mainData.secondName } }}</MainDataProfile>
                        <PhoneDataProfile>{{ workPhoneNum: mainData.workPhoneNum, phoneNumber: phoneNumber }}</PhoneDataProfile>
                        <div className="ColorStyle divInfo vertBlock">
                            <div style={{ overflow: 'auto', maxHeight: 296 }}>
                                <PhoneRequest>{{ name: 'Oleg Sidorov' }}</PhoneRequest>
                                <hr style={{ width: 200 }}></hr>
                                <PhoneRequest>{{ name: 'Igor kirrilov' }}</PhoneRequest>
                                <hr style={{ width: 200 }}></hr>
                                <PhoneRequest>{{ name: 'Valeriy Savchenko' }}</PhoneRequest>
                            </div>
                        </div>
                    </div>
                    <div className="vertBlock">
                        <SubDataProfile>{{ email: authData.email, workData: { department: subData.department, post: subData.post, workPlace: subData.workPlace }, aboutMe: subData.aboutMe }}</SubDataProfile>
                    </div>
                </div>
            </div>
        </div>
    )
}
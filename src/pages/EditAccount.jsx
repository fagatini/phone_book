import { useState, useEffect } from "react";
import React from "react";
import { FirstStepContext } from "../context/firstStepContext";
import { SecondStepContext } from "../context/secondStepContext";
import { ThirdStepContext } from "../context/thirdStepContext";
import { sendPostRequest, sendGetRequest } from "../axios/hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profile from '../pictures/profile.png';
import FirstStepEdit from "../components/FirstStepEdit/FirstStepEdit";
import SecondStepEdit from "../components/SecondStepEdit/SecondStepEdit";
import ThirdStepEdit from "../components/ThirdStepEdit/ThirdStepEdit";

function EditAccount() {
    const param = useParams();
    const [step, setStep] = useState(4);
    const [authData, setAuthData] = useState({ email: '', password: '' })
    const [mainData, setMainData] = useState({ firstName: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '', phoneNumber: [], isShowBirthdate: false, isShowNums: false })
    const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });

    let navigate = useNavigate();

    useEffect(() => (async () => {
        const response = await sendGetRequest(`/app/account/${param.accountId}`)
        if (response) {
            setAuthData({ email: response.mainInfo.email, password: response.mainInfo.password })
            setMainData({ firstName: response.mainInfo.first_name, midleName: response.mainInfo.midle_name, secondName: response.mainInfo.second_name, birthDate: response.mainInfo.birthdate.slice(0, 10), workPhoneNum: response.mainInfo.job_phone_num, phoneNumber: response.phoneNumbers.map((number, index) => response.phoneNumbers[index].phone_number), isShowBirthdate: response.mainInfo.is_show_bd, isShowNums: response.mainInfo.is_show_num })
            setSubData({ department: response.mainInfo.department, post: response.mainInfo.post, workPlace: response.mainInfo.workplace, aboutMe: response.mainInfo.about_me, photoURL: response.mainInfo.photo_url ? response.mainInfo.photo_url : profile })
        }
    })(), [param.accountId])

    useEffect(() => {
        if (authData.email && step === 4) {
            setStep(0)
        }
    }, [authData])

    useEffect(() =>
        (async () => {
            if (step === 3) {
                const response = await sendPostRequest(`/app/account/edit/${param.accountId}`, {
                    "email": authData.email,
                    "password": authData.password,
                    "first_name": mainData.firstName,
                    "midle_name": mainData.midleName,
                    "sec_name": mainData.secondName,
                    "birthdate": mainData.birthDate,
                    "job_phone_num": mainData.workPhoneNum,
                    "phone_number": mainData.phoneNumber,
                    "is_show_bd": mainData.isShowBirthdate,
                    "is_show_num": mainData.isShowNums,
                    "department": subData.department,
                    "post": subData.post,
                    "workplace": subData.workPlace,
                    "about_me": subData.aboutMe,
                    "photo_url": subData.photoURL
                })
                if (response.error) {
                    if (response.error === "Email is already used") {
                        setStep(1)
                        alert('email is already used')
                    }
                }
                else if (response.message) {
                    if (response.message === "user changed") {
                        let id = sessionStorage.getItem("isLoggedIn")
                        navigate(`/account:${id}`)
                    }
                } else {
                    setStep(1)
                    alert('smth went wrong')
                }
            }
        }
        )(), [step])

    const handleClick = async (currentStep) => {
        setStep(currentStep + 1)
    };


    if (step === 0) {
        return (
            <FirstStepContext.Provider value={{ ...authData, setFunction: setAuthData }}>
                <FirstStepEdit handleClick={handleClick}></FirstStepEdit>
            </FirstStepContext.Provider>
        );
    } else if (step === 1) {
        return (
            <>
                <SecondStepContext.Provider value={{ ...mainData, setFunction: setMainData }}>
                    <SecondStepEdit handleClick={handleClick}></SecondStepEdit>
                </SecondStepContext.Provider>
            </>
        );
    } else if (step === 2) {
        return (
            <>
                <ThirdStepContext.Provider value={{ ...subData, setFunction: setSubData }}>
                    <ThirdStepEdit handleClick={handleClick}></ThirdStepEdit>
                </ThirdStepContext.Provider>
            </>
        );
    }
    else {
        return <></>
    }
}

export default EditAccount;

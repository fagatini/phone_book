import { useContext, useState } from "react";
import React from "react";
import FirstStepReg from "../components/FirstStepReg/FirstStepReg";
import SecondStepReg from "../components/SecondStepReg/SecondStepReg";
import ThirdStepReg from "../components/ThirdStepReg/ThirdStepReg";
import { FirstStepContext } from "../context/firstStepContext";
import { SecondStepContext } from "../context/secondStepContext";
import { ThirdStepContext } from "../context/thirdStepContext";
import { sendPostRequest } from "../axios/hooks";

import { useNavigate, Navigate } from "react-router-dom";

function Registration() {
  const [step, setStep] = useState(0);
  const [authData, setAuthData] = useState({ email: '', password: '' })
  const [mainData, setMainData] = useState({ firstName: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '', phoneNumber: [], isShowBirthdate: false, isShowNums: false })
  const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });

  let navigate = useNavigate();

  const handleClick = async (currentStep) => {
    setStep(currentStep + 1)
    if (currentStep + 1 === 3) {
      const response = await sendPostRequest(`/app/register`, {
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
        if (response.message === "new user created") {
          sessionStorage.setItem("isLoggedIn", response.id);
          navigate(`/account:${response.id}`)
        }
      }
      else {
        setStep(1)
        alert('smth went wrong')
      }

    }
  };
  if (step === 0) {
    return (
      <FirstStepContext.Provider value={{ ...authData, setFunction: setAuthData }}>
        <FirstStepReg handleClick={handleClick}></FirstStepReg>
      </FirstStepContext.Provider>
    );
  } else if (step === 1) {
    return (
      <>
        <SecondStepContext.Provider value={{ ...mainData, setFunction: setMainData }}>
          <SecondStepReg handleClick={handleClick}></SecondStepReg>
        </SecondStepContext.Provider>
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <ThirdStepContext.Provider value={{ ...subData, setFunction: setSubData }}>
          <ThirdStepReg handleClick={handleClick}></ThirdStepReg>
        </ThirdStepContext.Provider>
      </>
    );
  }
  else {
    return <></>
  }
}

export default Registration;

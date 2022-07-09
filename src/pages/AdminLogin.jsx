import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import ChangeVievButton from "../components/ChangeVievButton/ChangeVievButton";
import eye from '../pictures/eye.png';
import closetEye from '../pictures/hidden.png';
import { sendPostRequest } from "../axios/hooks";

import { useNavigate } from "react-router-dom";

export function AdminLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [isUserExist, setIsUserExist] = useState(true)
    const [isRightPass, setIsRightPass] = useState(true)

    const passFieldAdmElem = useRef(null)
    const emailFieldAdmElem = useRef(null)

    let navigate = useNavigate();

    const login = async () => {
        if (email !== '' && pass !== '') {
            const response = await sendPostRequest(`/app/admin`, {
                "email": email,
                "password": pass
            })
            if (response.error) {
                if (response.error === "Admin is not exist") {
                    setIsUserExist(false)
                }
                else if (response.error === "Incorrect password") {
                    setIsRightPass(false)
                }
            }
            else if (response.message === "Admin signed in") {
                sessionStorage.setItem("isLoggedIn", response.id);
                sessionStorage.setItem("isAdmin", true);
                navigate(`/account:${response.id}`)
            }
        }
    }

    useEffect(() => {
        !isRightPass ? passFieldAdmElem.current.style.borderColor = 'red' : passFieldAdmElem.current.style.borderColor = ''
        !isUserExist ? emailFieldAdmElem.current.style.borderColor = 'red' : emailFieldAdmElem.current.style.borderColor = ''
    }, [isUserExist, isRightPass])

    const onChangeEmailField = (e) => {
        setEmail(e.target.value)
        setIsUserExist(true)
        setIsRightPass(true)
    }

    const onChangePasswordField = (e) => {
        setPass(e.target.value)
        setIsUserExist(true)
        setIsRightPass(true)
    }

    const handlePasswordShow = () => {
        setIsPasswordShowed((prev) => !prev)
        passFieldAdmElem.current.type = !isPasswordShowed ? 'text' : 'password'
    }

    return (
        <>
            <div className="App">
                <div className="AppWrapperVert">
                    <h1 style={{ textAlign: "center" }}>Log in as admin</h1>
                    <Input
                        ref={emailFieldAdmElem}
                        type="email"
                        placeholder="email@email.ru"
                        value={email}
                        onChange={(e) => { onChangeEmailField(e) }}
                    ></Input>
                    <div style={{ position: 'relative' }}>
                        <Input
                            ref={passFieldAdmElem}
                            type="password"
                            placeholder="password"
                            value={pass}
                            onChange={(e) => { onChangePasswordField(e) }}
                        ></Input>
                        <ChangeVievButton isUsed={isPasswordShowed} srcIsUsed={closetEye} srcNotUsed={eye} onClick={handlePasswordShow} ></ChangeVievButton>
                    </div>
                    <div className="AppWrapperHor" style={{ position: 'relative' }}>
                        <Button onClick={() => login()}>log in</Button>
                        {!isUserExist ? <div style={{ color: 'red', textAlign: "center", position: 'absolute', top: -99 }}>admin does not exist</div> : <></>}
                        {!isRightPass ? <div style={{ color: 'red', textAlign: "center", position: 'absolute', top: -26 }}>wrong password</div> : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}

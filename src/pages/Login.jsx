import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import ChangeVievButton from "../components/ChangeVievButton/ChangeVievButton";
import eye from '../pictures/eye.png';
import closetEye from '../pictures/hidden.png';
import { sendPostRequest } from "../axios/hooks";

import { useNavigate, Navigate } from "react-router-dom";

function Login({ handleClick }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [isUserExist, setIsUserExist] = useState(true)
    const [isRightPass, setIsRightPass] = useState(true)

    const passwordFieldElem = useRef(null)
    const EmailField = useRef(null)
    const handlePasswordShow = () => {
        setIsPasswordShowed((prev) => !prev)
        passwordFieldElem.current.type = !isPasswordShowed ? 'text' : 'password'
    }

    let navigate = useNavigate();

    const registration = () => {
        navigate('/registration')
    }
    const login = async () => {
        if (email !== '' && pass !== '') {
            const response = await sendPostRequest(`/app/`, {
                "email": email,
                "password": pass
            })
            if (response.error) {
                if (response.error === "User is not exist") {
                    setIsUserExist(false)
                    // setIsRightPass(false)
                }
                else if (response.error === "Incorrect password") {
                    setIsRightPass(false)
                }
            }
            else if (response.message === "User signed in") {
                sessionStorage.setItem("isLoggedIn", response.id);
                navigate(`/account:${response.id}`)
            }
        }
    }

    useEffect(() => {
        !isRightPass ? passwordFieldElem.current.style.borderColor = 'red' : passwordFieldElem.current.style.borderColor = ''
        !isUserExist ? EmailField.current.style.borderColor = 'red' : EmailField.current.style.borderColor = ''
    }, [isUserExist, isRightPass])

    return (
        <>
            <div className="App">
                <div className="AppWrapperVert">
                    <h1 style={{ textAlign: "center" }}>Log in</h1>
                    <Input
                        ref={EmailField}
                        type="email"
                        placeholder="email@email.ru"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setIsUserExist(true); setIsRightPass(true) }}
                    ></Input>
                    <div style={{ position: 'relative' }}>
                        <Input
                            ref={passwordFieldElem}
                            type="password"
                            placeholder="password"
                            value={pass}
                            onChange={(e) => { setPass(e.target.value); setIsUserExist(true); setIsRightPass(true) }}
                        ></Input>
                        <ChangeVievButton isUsed={isPasswordShowed} srcIsUsed={closetEye} srcNotUsed={eye} onClick={handlePasswordShow} ></ChangeVievButton>
                    </div>
                    <div className="AppWrapperHor" style={{ position: 'relative' }}>
                        <Button onClick={() => login()}>log in</Button>
                        <Button onClick={() => registration()}>sign up</Button>
                        {!isUserExist ? <div style={{ color: 'red', textAlign: "center", position: 'absolute', top: -99 }}>user does not exist</div> : <></>}
                        {!isRightPass ? <div style={{ color: 'red', textAlign: "center", position: 'absolute', top: -26 }}>wrong password</div> : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
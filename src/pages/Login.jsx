import React from "react";
import { useContext, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import ChangeVievButton from "../components/ChangeVievButton/ChangeVievButton";
import eye from '../pictures/eye.png';
import closetEye from '../pictures/hidden.png';
import { useRef } from "react";

import { useNavigate, Navigate, useLocation } from "react-router-dom";

function Login({ handleClick }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);

    const passwordFieldElem = useRef(null)
    const handlePasswordShow = () => {
        setIsPasswordShowed((prev) => !prev)
        passwordFieldElem.current.type = !isPasswordShowed ? 'text' : 'password'
    }

    let navigate = useNavigate();
    let location = useLocation();

    const registration = () => {
        navigate('/registration' + location.search)
    }
    const login = () => {
        // использовать endpoint для входа
        if (pass === '123' && email === 'xxx') {
            let id = 1
            sessionStorage.setItem("isLoggedIn", id);
            navigate(`/account:${id}` + location.search)
        }
        if (pass === '321' && email === 'yyy') {
            let id = 2
            sessionStorage.setItem("isLoggedIn", id);
            navigate(`/account:${id}` + location.search)
        }
    }

    return (
        <>
            <div className="App">
                <div className="AppWrapperVert">
                    <h1 style={{ textAlign: "center" }}>Log in</h1>
                    <Input
                        type="email"
                        placeholder="email@email.ru"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                    <div style={{ position: 'relative' }}>
                        <Input
                            ref={passwordFieldElem}
                            type="password"
                            placeholder="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        ></Input>
                        <ChangeVievButton isUsed={isPasswordShowed} srcIsUsed={closetEye} srcNotUsed={eye} onClick={handlePasswordShow} ></ChangeVievButton>
                    </div>
                    <div className="AppWrapperHor">
                        <Button onClick={() => login()}>log in</Button>
                        <Button onClick={() => registration()}>sign up</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
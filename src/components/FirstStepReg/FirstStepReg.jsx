import React from "react";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { FirstStepContext } from "../../context/firstStepContext";
import ChangeVievButton from "../ChangeVievButton/ChangeVievButton";
import eye from '../../pictures/eye.png';
import closetEye from '../../pictures/hidden.png';
import { useRef } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";


function FirstStepReg({ handleClick }) {
  const [authData, setAuthData] = useState({ login: "", pass: "" });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secPass, setSecPass] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [isConfPasswordShowed, setIsConfPasswordShowed] = useState(false);

  const passwordFieldElem = useRef(null)
  const confPasswordFieldElem = useRef(null)
  const handlePasswordShow = () => {
    setIsPasswordShowed((prev) => !prev)
    passwordFieldElem.current.type = !isPasswordShowed ? 'text' : 'password'
  }
  const handleConfirmPasswordShow = () => {
    setIsConfPasswordShowed((prev) => !prev)
    confPasswordFieldElem.current.type = !isConfPasswordShowed ? 'text' : 'password'
    // сет не успевает отработать, таким образом в тернарке всё еще false, хотя он и до смены был false
  }

  const confirmAuthData = () => {
    if (pass === secPass) {
      setAuthData({ email, pass });
    }
  };

  let navigate = useNavigate()
  let location = useLocation();

  const backToLogin = () => {
    navigate('/' + location.search)
  }

  return (
    <>
      <FirstStepContext.Provider value={{ ...authData, setF: setAuthData }}>
        <div className="App">
          <div className="AppWrapperVert">
            <h1 style={{ textAlign: "center" }}>Registration: step 1</h1>
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
            <div style={{ position: 'relative' }}>
              <Input
                ref={confPasswordFieldElem}
                type="password"
                placeholder="confirm pass"
                value={secPass}
                onChange={(e) => setSecPass(e.target.value)}
              ></Input>
              <ChangeVievButton isUsed={isConfPasswordShowed} srcIsUsed={closetEye} srcNotUsed={eye} onClick={handleConfirmPasswordShow} ></ChangeVievButton>
            </div>
            <div className="AppWrapperHor">
              <Button onClick={() => backToLogin()}>log in</Button>
              <Button onClick={() => handleClick(0)}>next</Button>
            </div>
          </div>
        </div>
      </FirstStepContext.Provider>
    </>
  );
}

export default FirstStepReg;
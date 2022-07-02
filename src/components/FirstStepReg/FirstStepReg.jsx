import React from "react";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { FirstStepContext } from "../../context/firstStepContext";
import ChangeVievButton from "../ChangeVievButton/ChangeVievButton";
import eye from '../../pictures/eye.png';
import closetEye from '../../pictures/hidden.png';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


function FirstStepReg({ handleClick }) {
  const context = useContext(FirstStepContext)

  const [email, setEmail] = useState(context.email || "");
  const [password, setPassword] = useState(context.password || "");
  const [secPass, setSecPass] = useState(context.password || "");
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
  }

  const confirmAuthData = (func, arg) => {
    if (!(email.indexOf('@') !== -1 && email.indexOf('.') !== -1)) {
      alert('wrong email format')
    }
    else if (password !== secPass && password.length >= 4) {
      alert('passwords are not equal')
    }
    else {
      context.setFunction({ email, password })
      func(arg)
    }
  };

  let navigate = useNavigate()

  const backToLogin = () => {
    navigate('/')
  }

  return (
    <>
      <div className="App">
        <div className="AppWrapperVert">
          <h1 style={{ textAlign: "center" }}>Registration: step 1</h1>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <div style={{ position: 'relative' }}>
            <Input
              ref={passwordFieldElem}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button onClick={() => confirmAuthData(handleClick, 0)}>next</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstStepReg;
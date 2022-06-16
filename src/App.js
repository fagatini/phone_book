import "./App.css";
import { useContext, useState } from "react";
import React from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { FirstStepContext } from "./context/firstStepContext";

function App() {
  const value = useContext(FirstStepContext);
  let T = value.login;

  const [authData, setAuthData] = useState({ login: "", pass: "" });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secPass, setSecPass] = useState("");
  const emailIsNotUsed = (Email) => {
    return true;
  };
  const confirmAuthData = () => {
    if (pass === secPass && emailIsNotUsed(email) && pass.length >= 5) {
      setAuthData({ email, pass });
    }
  };
  return (
    <>
      <FirstStepContext.Provider value={{ ...authData, setF: setAuthData }}>
        <div className="App">
          <div className="AppWrapperVert">
            <Input
              type="email"
              placeholder="email@email.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="confirm pass"
              value={secPass}
              onChange={(e) => setSecPass(e.target.value)}
            ></Input>

            <div className="AppWrapperHor">
              <Button onClick={() => confirmAuthData()}>create</Button>
              <Button onClick={() => console.log(authData)}>cancel</Button>
            </div>
          </div>
        </div>
      </FirstStepContext.Provider>
    </>
  );
}

export default App;

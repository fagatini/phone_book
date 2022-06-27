import React from "react";
import { useContext, useState } from "react";
// import { FirstStepContext } from "./context/firstStepContext";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { SecondStepContext } from "../../context/secondStepContext";
import AddButton from "../AddButton/AddButton";
import plus from '../../pictures/add.png'

function SecondStepReg({ handleClick }) {
  const [name, setName] = useState("");
  const [midleName, setMidleName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [workPhoneNum, setWorkPhoneNum] = useState("");
  const [phoneNum, setPhoneNum] = useState([]);
  const [MainData, setMainData] = useState({ name: '', midleName: '', secondName: '', birthDate: '', workPhoneNum: '', phoneNum: {} });

  const handleOnNumberChange = (e, index) => {
    let newNumbers = [...phoneNum]
    newNumbers[index] = e.target.value
    setPhoneNum(newNumbers)
  }
  const handleOnClick = () => {
    setPhoneNum([...phoneNum, ''])
  }
  return (
    <>
      <SecondStepContext.Provider value={{ ...MainData, setF: setMainData }}>
        <div className="App">
          <div className="AppWrapperVert">
            <h1 style={{ textAlign: "center" }}>Registration: step 2</h1>
            <Input
              type="text"
              placeholder="first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="midle name"
              value={midleName}
              onChange={(e) => setMidleName(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="second name"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            ></Input>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            ></Input>
            <Input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
              placeholder="work phone number"
              value={workPhoneNum}
              onChange={(e) => setWorkPhoneNum(e.target.value)}
            ></Input>
            <div style={{ overflow: 'auto', maxHeight: 148 }}>
              {phoneNum.map((number, index) => (
                <Input
                  key={index}
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                  placeholder="phone number"
                  value={number}
                  onChange={(e) => handleOnNumberChange(e, index)}
                ></Input>
              ))}
              {/* добавить кнопку здесь справа с дейстивием */}
            </div>
            <AddButton src={plus} onClick={handleOnClick}></AddButton>
            <div className="AppWrapperHor">
              <Button onClick={() => handleClick(-1)}>back</Button>
              <Button onClick={() => handleClick(1)}>next</Button>
            </div>
          </div>
        </div>
      </SecondStepContext.Provider>
    </>
  );
}

export default SecondStepReg;
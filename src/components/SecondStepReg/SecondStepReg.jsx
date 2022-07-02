import React from "react";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { SecondStepContext } from "../../context/secondStepContext";
import AddButton from "../AddButton/AddButton";
import plus from '../../pictures/add.png'

function SecondStepReg({ handleClick }) {
  const context = useContext(SecondStepContext)

  const [firstName, setFirstName] = useState(context.firstName || "");
  const [midleName, setMidleName] = useState(context.midleName || "");
  const [secondName, setSecondName] = useState(context.secondName || "");
  const [birthDate, setBirthDate] = useState(context.birthDate || "");
  const [workPhoneNum, setWorkPhoneNum] = useState(context.workPhoneNum || "");
  const [phoneNumber, setPhoneNumber] = useState(context.phoneNumber || []);
  const [isShowBirthdate, setIsShowBirthdate] = useState(context.isShowBirthdate || false)
  const [isShowNums, setIsShowNums] = useState(context.isShowNums || false)


  const handleOnNumberChange = (e, index) => {
    let newNumbers = [...phoneNumber]
    newNumbers[index] = e.target.value
    setPhoneNumber(newNumbers)
  }
  const handleOnClick = () => {
    setPhoneNumber([...phoneNumber, ''])
  }

  const confirmMainData = (func, arg) => {
    let isPhonesCorrect = true
    phoneNumber.forEach(element => {
      isPhonesCorrect = isPhonesCorrect && (element[0] === '+' && element.length >= 12)
    });
    if (!(firstName.length >= 2 && secondName.length >= 2)) {
      alert('first and second name must be introduced')
    }
    else if (birthDate.indexOf('-') !== 4) {
      alert('wrong birthdate format')
    }
    else if (!(workPhoneNum[0] === '+' && workPhoneNum.length >= 12)) {
      alert('wrong work phone number format')
    }
    else if (!isPhonesCorrect) {
      alert('wrong phone numbers format')
    }
    else {
      context.setFunction({ firstName, midleName, secondName, birthDate, workPhoneNum, phoneNumber, isShowBirthdate, isShowNums })
      func(arg)
    }
  }

  return (
    <>
      <div className="App">
        <div className="AppWrapperVert">
          <h1 style={{ textAlign: "center" }}>Registration: step 2</h1>
          <Input
            type="text"
            placeholder="first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Input>
          <Input
            type="text"
            required
            placeholder="midle name"
            value={midleName}
            onChange={(e) => setMidleName(e.target.value)}
          ></Input>
          <Input
            type="text"
            placeholder="second name"
            required
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          ></Input>
          <Input
            required
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          ></Input>
          <Input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{2}-[0-9]{2}"
            placeholder="work phone number"
            value={workPhoneNum}
            onChange={(e) => setWorkPhoneNum(e.target.value)}
          ></Input>
          <div style={{ overflow: 'auto', maxHeight: 148 }}>
            {phoneNumber.map((number, index) => (
              <Input
                key={index}
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="phone number"
                value={number}
                onChange={(e) => handleOnNumberChange(e, index)}
              ></Input>
            ))}
          </div>
          <AddButton src={plus} onClick={handleOnClick}></AddButton>
          <div className="AppWrapperHor">
            <input type='checkbox'></input><div>hide birthdate</div>
            <input type='checkbox'></input><div>hide numbers</div>
          </div>
          <div className="AppWrapperHor">
            <Button onClick={() => confirmMainData(handleClick, -1)}>back</Button>
            <Button onClick={() => confirmMainData(handleClick, 1)}>next</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecondStepReg;
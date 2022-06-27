import { useContext, useState } from "react";
import React from "react";
import FirstStepReg from "../components/FirstStepReg/FirstStepReg";
import SecondStepReg from "../components/SecondStepReg/SecondStepReg";
import ThirdStepReg from "../components/ThirdStepReg/ThirdStepReg";
import { FirstStepContext } from "../context/firstStepContext";
import { SecondStepContext } from "../context/secondStepContext";
import { ThirdStepContext } from "../context/thirdStepContext";


function Registration() {
  const authData = useContext(FirstStepContext);
  const mainData = useContext(SecondStepContext);
  const subData = useContext(ThirdStepContext);
  const [step, setStep] = useState(0);
  const handleClick = (currentStep) => {
    setStep(currentStep + 1);
  };
  if (step === 0) {
    return (
      <>
        <FirstStepReg handleClick={handleClick}></FirstStepReg>
      </>
    );
  } else if (step === 1) {
    return (
      <>
        <SecondStepReg handleClick={handleClick}></SecondStepReg>
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <ThirdStepReg handleClick={handleClick}></ThirdStepReg>
      </>
    );
  } else {
    //использовать post метод
  }
}

export default Registration;

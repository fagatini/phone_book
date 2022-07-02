import { createContext } from "react";

let defaultValue = {
  name: null,
  midleName: null,
  secondName: null,
  birthDate: null,
  workPhoneNum: null,
  phoneNumber: null,
  isShowBirthdate: null,
  isShowNums: null,
  setFunction: () => {},
};

export const SecondStepContext = createContext(defaultValue);

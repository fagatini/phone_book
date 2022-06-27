import { createContext } from "react";

let defaultValue = {
  name: null,
  midleName: null,
  secondName: null,
  birthDate: null,
  workPhoneNum: null,
  phoneNum: null,
  setF: () => {},
};

export const SecondStepContext = createContext(defaultValue);

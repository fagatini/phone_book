import { createContext } from "react";

let defaultValue = {
  department: null,
  post: null,
  workPlace: null,
  aboutMe: null,
  photoURL: null,
  setF: () => {},
};

export const ThirdStepContext = createContext(defaultValue);

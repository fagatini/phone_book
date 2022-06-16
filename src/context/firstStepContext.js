import { createContext } from "react";

let defaultValue = { login: null, pass: null, setF: () => {} };

export const FirstStepContext = createContext(defaultValue);

import { createContext } from "react";

let defaultValue = { email: null, password: null, setFunction: () => {} };

export const FirstStepContext = createContext(defaultValue);

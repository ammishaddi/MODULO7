
import { useReducer } from "react";
import { GlobalContext } from "./GlobalContext";

const initialState = {
  input: "",
  response: "",
  loading: false,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

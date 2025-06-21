import { createContext } from "react";

export const AuthContext = createContext({session: null, setSession: null});
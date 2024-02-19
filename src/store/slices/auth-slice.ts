import { userType } from "@/types/user";
import { StateCreator } from "zustand";


export interface AuthSlice {
    userInfo: undefined | userType;
    setUserInfo:(userInfo: userType) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    userInfo: undefined,
    setUserInfo:(userInfo: userType) =>set({userInfo}),
})
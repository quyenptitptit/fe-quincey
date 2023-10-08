import { atom, selector } from "recoil";

export const toastState = atom({
    key: "toastState",
    default: false
})

export const toastTxt = atom({
    key: "toastTxt",
    default: ""
})

export const toastType = atom({
    key: "toastType",
    default: "success"
})

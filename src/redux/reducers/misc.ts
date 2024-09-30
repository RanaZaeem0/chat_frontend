
import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";


const initialState = {
    isNewGroup: false,
    isSearch: false,
    isNotification: false,
    isAddMember: false,
    isMobile:false,
    isDeleteMenu:false,
    isFileMenu:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId:"",
        groupChat:false
    }
}


const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload
        }
    },
});

export default miscSlice

export const {setIsNewGroup,setIsSearch,setIsNotification,setIsAddMember,setIsMobile,setIsDeleteMenu,setIsFileMenu,setSelectedDeleteChat} = miscSlice.actions
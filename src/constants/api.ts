import { ResetTvRounded } from "@mui/icons-material";
import axios from "axios";



const getToken = ()=>{

 const token =  localStorage.getItem('refreshToken')
 if(token){
    return token
 }
 else{
    return false
 }
}


const token = localStorage.getItem('token')

const authApi = axios.create()

export {authApi,getToken}
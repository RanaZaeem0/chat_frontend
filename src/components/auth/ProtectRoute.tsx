import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom"


interface UserData {
    _id: string;
    fullName: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    avatar: {
      url: string;
      public_id: string;
    };
  }



const ProtectRoute =  ({children,redirect="/login",user}:{
    children:ReactNode,
    redirect:string,
    user:UserData
})=>{

    console.log(user,"i am user protect ");
    
if(!user) return <Navigate to={redirect}/>

    return children ? children : <Outlet/>
}
export {ProtectRoute}




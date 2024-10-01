import { Navigate, Outlet } from "react-router-dom"




const ProtectRoute =  ({children,redirect="/login",user})=>{

    console.log(user,"i am user protect ");
    
if(!user) return <Navigate to={redirect}/>

    return children ? children : <Outlet/>
}
export {ProtectRoute}




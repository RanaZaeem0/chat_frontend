import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import {
  Add as AddIcon,
  Flag,
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon, 
  Cookie
} from "@mui/icons-material";
import { flushSync } from "react-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setIsSearch } from "../../redux/reducers/misc";
import axios from "axios";

const SearchDailog = lazy(()=> import("../specific/Search"))
const NotificationDialog = lazy(()=> import("../specific/Notification"))
const NewGroup  = lazy(()=>import("../specific/NewGroup"))


export default function Header() {

  const [ismobileOpen, setMobileOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup,setIsNewGroup ] = useState(false)
  const dispatch = useDispatch()
  const {isMobile,isSearch} = useSelector((state:RootState)=>state.misc)


  const handleMobileNav = () => {
dispatch(setIsMobile(true))
  }
  ;


  const handleLogout = ()=>{
 axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`,{
   withCredentials:true
 }).then((res)=>{
   if(res.status >= 200 && res.status < 300){
     window.location.reload()
   }
 }).catch((error)=>{
   console.log("error");
 })
  }

  const openSearchDeilog = () => {
    dispatch(setIsSearch(true));
  };

  const navigateGroup = ()=>{
    setIsNewGroup(prev => !prev)
  }
  const handleNotification   = ()=>{
    setIsNotification(prev =>!prev)
  }




  return (
  <>
    <Box
      sx={{
        flexGrow: 1,
        height: "4rem",
      }}
    >
      <AppBar position="static" sx={{ bgColor: "red" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Chats
          </Typography>
          <Box
            sx={{
              display: {
                sm: "none",
                xs: "block",
              },
            }}
          >
            <IconButton color="inherit" size="large" onClick={handleMobileNav}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGlow: 1,
            }}
          ></Box>
          <Box>
          <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
               onClick={handleNotification}
              />
            <IconBtn title={"search"} icon={<SearchIcon />} onClick={openSearchDeilog}/>
            <IconBtn title={"Chat"} icon={<AddIcon />} onClick={handleNotification} />
            <IconBtn title={"Group"} icon={<GroupIcon />} onClick={navigateGroup} />
            <IconBtn  title={"logout"} icon={<LogoutIcon />} onClick={handleLogout}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    
    {
      isSearch && <Suspense fallback={<div>Loading</div>
      }>
        <SearchDailog />
      </Suspense>
    }
     {
      isNotification && <Suspense fallback={<div>Loading</div>
      }>
        <NotificationDialog />
      </Suspense>
    }
     {
      isNewGroup && <Suspense fallback={<div>Loading</div>
      }>
        <NewGroup />
      </Suspense>
    }
    </>
  );
}


const IconBtn = ({title,onClick,icon})=>{

  return (

    <Tooltip title={title}>
      <IconButton
        color="inherit"
        size="large"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

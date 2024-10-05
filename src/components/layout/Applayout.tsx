import React from "react";
import Title from "../shared/Title";
import Header from "./Header";
import { Drawer, Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sample";
import Profile from "../specific/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { getSocket } from "../../socket";
const Applayout = () => (WrapperComponent) => {

  return (props) => {


    const  {isError,error,isLoading,isSuccess,data} = useMyChatsQuery("")
    const dispatch = useDispatch();

    const {isMobile} = useSelector((state) => state.misc)

    const socket = getSocket()

    console.log(socket.id,"soveket");
    
    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };


    return (
      <div className="">
        <Header />
   {
        !isLoading && <Drawer open={isMobile} onClose={handleMobileClose} >
          <h1>dsadsa</h1>
          <ChatList 
          w="70vw"
            chats={samepleChats}
            chatId={'1'}
            newMessagesAlert={[{chatId:'1',count:4}]}
            />
        </Drawer>
   }
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              borderRight: "1px solid #ccc",
              display: { xs: "none", sm: "block" },
            }}
          >
            <ChatList 
            chats={samepleChats}
            chatId={'1'}
            newMessagesAlert={[{chatId:'1',count:4}]}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} sx={{borderRight: "1px solid #ccc",}}>
            <WrapperComponent {...props} />
          </Grid>
          <Grid item md={4} lg={3} height={"100%"} 
          sx={{borderRight: "1px solid #ccc",
          display:{xs:"none",sm:"block"}
          }}>
     <Profile/>
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default Applayout;

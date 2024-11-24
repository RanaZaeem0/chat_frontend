import  { useCallback } from "react";
import { Drawer, Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import {  useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { getSocket } from "../../socket";
import { useParams } from "react-router-dom";
import { NEW_MESSAGE_ALERT } from "../../constants/events";
import { RootState } from "../../redux/reducers/store";
const Applayout = () => (WrapperComponent:any) => {
  return (props :any) => {
    const params = useParams();
    const dispatch = useDispatch();
    const socket = getSocket()

    const chatId :string | undefined = params.chatId;

    const { user } = useSelector((state:RootState) => state.auth);

    const {  isLoading,  data } = useMyChatsQuery({});
console.log("render applayout");

    const { isMobile } = useSelector((state:RootState) => state.misc);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    const newMessageAlertListener = useCallback(
      (data :any)=>{
        if(data.chatId == chatId) return;

      }
,[chatId]    )
    const eventHandlers ={
      [NEW_MESSAGE_ALERT]:newMessageAlertListener
    }
    useSocketEvents(socket,eventHandlers)

    return (
      <div className="">
        {!isLoading && (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.data}
              chatId={chatId}
              newMessagesAlert={[{ chatId: chatId, count: 4 }]}
            />
          </Drawer>
        )}
        <Grid container className="bg-black" height={"calc(100vh - 0rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              borderRight: "1px solid #ccc",
              display: { xs: "none", sm: "block", backgroundColor: "black" },
            }}
          >
            <ChatList
            w={"100%"}
            handleDeleteChat={[""]}
            onlineUser={[""]}
              chats={data?.data}
              chatId={chatId}
              newMessagesAlert={[{  chatId, count: 4 }]}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={9}
            height={"100%"}
            sx={{ borderRight: "1px solid #ccc" }}
          >
            <WrapperComponent {...props} chatId={chatId} user={user} />
          </Grid>
          
        </Grid>
      </div>
    );
  };
};

export default Applayout;

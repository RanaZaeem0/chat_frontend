import { useCallback } from "react";
import { Drawer, Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { getSocket } from "../../socket";
import { useParams } from "react-router-dom";
import { NEW_MESSAGE_ALERT } from "../../constants/events";
import { RootState } from "../../redux/reducers/store";
import Header from "../layout/Header"
import { setNewMessagesAlert } from "../../redux/reducers/chatSlice";

const Applayout = () => (WrapperComponent: any) => {
  return (props: any) => {
    const params = useParams();
    const dispatch = useDispatch();
    const socket = getSocket()

    const chatId: string | undefined = params.chatId;

    const { user } = useSelector((state: RootState) => state.auth);

    const { isLoading, data } = useMyChatsQuery({});

    const { isMobile } = useSelector((state: RootState) => state.misc);
    const {newMessagesAlert} = useSelector((state: RootState) => state.chat);
    // useEffect(() => {
    //   getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    // }, [newMessagesAlert]);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    const newMessageAlertListener = useCallback(
      (data: any) => {
        
        if (data.chatId == chatId) {
          dispatch(setNewMessagesAlert(data))

        }
      }
      , [chatId])
    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener
    }
    useSocketEvents(socket, eventHandlers)

    return (
      <div className="">
        <Header />
        {!isLoading && (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.data}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}
        <Grid container className="bg-black" height={"calc(100vh - 5rem)"}>
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
              newMessagesAlert={newMessagesAlert}
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

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
import { useParams } from "react-router-dom";
const Applayout = () => (WrapperComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();

    const chatId = params.chatId;

    const { user } = useSelector((state) => state.auth);

    const { isError, error, isLoading, isSuccess, data } = useMyChatsQuery();

    const { isMobile } = useSelector((state) => state.misc);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    return (
      <div className="">
        <Header />
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
        <Grid container className="bg-black" height={"calc(100vh - 4rem)"}>
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
              chats={data?.data}
              chatId={chatId}
              newMessagesAlert={[{ chatId: chatId, count: 4 }]}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            sx={{ borderRight: "1px solid #ccc" }}
          >
            <WrapperComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={1}
            height={"100%"}
            className=" max-lg: "
            sx={{
              borderRight: "1px solid #ccc",
            	 display: {xs: 'block', xl: 'none'  }
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default Applayout;

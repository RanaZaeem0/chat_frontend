import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Applayout from '../components/layout/Applayout'
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import MessageComponent from   "../components/shared/MessageCompount" ;
import FileMenu from '../components/dialogs/FileMenu';
import { InputBox } from "../components/styles/StyledComponents";
import { matBlack } from "../constants/color";

 function Chats() {


const allMessages = []

const chatId = ""

const submitHandler  = ()=>{

}

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const messageOnChange = (e)=>{
    setMessage(e.target.value)
  }

  const handleFileOpen  = ()=>{

  }

  return (
    <Fragment>
    <Stack
      ref={containerRef}
      boxSizing={"border-box"}
      padding={"1rem"}
      spacing={"1rem"}
      bgcolor={matBlack}
      height={"90%"}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {allMessages.map((i) => (
        <MessageComponent key={i._id} message={i} user={user} />
      ))}

      {userTyping && <TypingLoader />}

      <div ref={bottomRef} />
    </Stack>

    <form
      style={{
        height: "10%",
      }}
      onSubmit={submitHandler}
    >
      <Stack
        direction={"row"}
        height={"100%"}
        padding={"1rem"}
        alignItems={"center"}
        position={"relative"}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg",
          }}
          onClick={handleFileOpen}
        >
          <AttachFileIcon />
        </IconButton>

        <InputBox
          placeholder="Type Message Here..."
          value={message}
          onChange={(e)=>messageOnChange(e)}
        />

        <IconButton
          type="submit"
          sx={{
            rotate: "-30deg",
            bgcolor: orange,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </form>

    <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
  </Fragment>

  )
}


export default Applayout()(Chats)
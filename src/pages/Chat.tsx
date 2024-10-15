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
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useSocket, useSocketEvents } from "../hooks/hook";
import NewGroup from "../components/specific/NewGroup";
import {useInfiniteScrollTop} from "6pp"
 function Chat({chatId ,user}) {


  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const oldMessageChunk = useGetMessagesQuery({chatId,page:page})

  


const chatDetails = useChatDetailsQuery({chatId,skip:!chatId})  

const members = chatDetails?.data?.data?.members


const {data:oldMessage,setData:setOldMessages} = useInfiniteScrollTop(containerRef,
oldMessageChunk.data?.data?.totalPages,
page,
setPage,
oldMessageChunk.data?.data?.messages

)

const socket  = getSocket()


const newMessageHandler = useCallback((data)=>{
console.log(data);

},[])
const eventHandler = {[NEW_MESSAGE]:newMessageHandler}

useSocketEvents(socket,eventHandler)

console.log(oldMessage,"old mess");


const submitHandler  = (e)=>{
  console.log(message);
  e.preventDefault()

  if(!message.trim()) return null;

  socket.emit(NEW_MESSAGE,{chatId,members,message})
  setMessage('')
  
}

 

  const messageOnChange = (e)=>{
    setMessage(e.target.value)
  }

  const handleFileOpen  = ()=>{

  }



  return (
    <Fragment>
    <Stack
    className="bg-black"
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
 
      {oldMessageChunk.isLoading ? <Skeleton /> :  oldMessage.map((i) => {
        
        
        return <MessageComponent key={i._id} message={i} user={user} />
 


 
 })}

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


export default Applayout()(Chat)
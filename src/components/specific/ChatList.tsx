import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { useMyChatsQuery } from "../../redux/api/api";


interface ChatList {
  w:string,
  chats:string[],
  chatId:string,
  onlineUser:string[],
  newMessagesAlert:[{
    chatId:string,
    count:number,
  }],
  handleDeleteChat:any

}


export default function ChatList({
  w = "100%",
  chats = [],
  chatId,
  onlineUser = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}:ChatList) 




{

  const {isError,error,isLoading,data}  = useMyChatsQuery()


  
  return (
    <Stack width={w} height={"column"} sx={{backgroundColor:"black"}}>
      {chats?.map((data,index) => {
        const {avatar, name, _id,groupChat, members} = data;
   
        const newMessageAlert = newMessagesAlert.find(
          (item) => item.chatId === _id
        )
      
        const isOnline = members.some((member) => onlineUser.includes(_id));

        return (
            <ChatItem 
            key={index}
             isOnline={isOnline}
             newMessage={newMessageAlert}
             avatar={avatar}
             name={name}
             _id={_id}
             groupChat={groupChat}
             sameSender={chatId === _id}
             handleDeleteChat={handleDeleteChat}
            />
        );
      })}
    </Stack>
  );
}

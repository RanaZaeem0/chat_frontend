import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import { matBlack } from "../../constants/color";


interface ChatList {
  w:string,
  chats:string[],
  chatId:string | undefined,
  onlineUser?:string[],
  newMessagesAlert:[{
    chatId:string | undefined,
    count:number,
  }],
  handleDeleteChat?:any

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



  
  return (
    <Stack width={w} height={"column"} sx={{backgroundColor:matBlack}} >
      {chats.map((data:any,index:number) => {
        const {avatar, name, _id,groupChat, members} = data;
   
        const newMessageAlert = newMessagesAlert.find(
          (item) => item.chatId === _id
        )
      
        const isOnline = members.some(() => onlineUser.includes(_id));

        return (
            <ChatItem 
            index={index}
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

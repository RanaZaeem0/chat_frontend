import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/Applayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {  lightGreen, matBlack } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageCompount";
import { getSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import {  useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chatSlice";
import { TypingLoader } from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import { UserDataType } from "../types/types";

const Chat = ({ chatId, user }:{
  chatId:string,
  user:UserDataType
}) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Define the structure for the sender
interface Sender {
  _id: string;
  name: string;
}

// Define the structure for a message
interface Message {
_id?:string;
  content: string; // The message content
  sender: Sender;  // Sender information
  chat: string;    // Chat ID the message belongs to
  createAt: string; // Timestamp when the message was created
}

// Define the structure for the new message data
interface NewMessageData {
  chatId: string;  // ID of the chat
  message: Message; // The message details
}


  const containerRef = useRef<HTMLDivElement | null>(null);;
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.data?.messages
  );


  

  const members = chatDetails?.data?.data?.members;

  const messageOnChange = (e:any) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const handleFileOpen = (e:any) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e:any) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    console.log(message);
    
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data:NewMessageData) => {
      console.log(data,"new message data");
      if (data.chatId !== chatId) return;
      console.log(data,"message new messagelistnier");
     const dataMessage = data.message 
      setMessages((prev) => [...prev, dataMessage]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data:any) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data:any) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
console.log(messages,"message types");

  // const alertListener = useCallback(
  //   (data:NewMessageData) => {
  //     if (data.chatId !== chatId) return;
  //     const messageForAlert  = {
  //       content: data.message,
  //       sender: {
  //         _id: "djasdhajksdhasdsadasdas",
  //         name: "Admin",
  //       },
  //       chat: chatId,
  //       createdAt: new Date().toISOString(),
  //     };
  //     console.log(messageForAlert,"message types");

  //     setMessages((prev) => [...prev, messageForAlert]);
  //   },
  //   [chatId]
  // );
  const alertListener = useCallback(
    (data: NewMessageData) => {
      if (data.chatId !== chatId) return;
      const messageForAlert: Message = {
        content: data.message.content, // Access `content` from `data.message`
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createAt: new Date().toISOString(),
      };
      console.log(messageForAlert, "message types");
  
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );
  
  console.log(messages,"type of messages");
 
  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);


  const allMessages = [...oldMessages, ...messages];
  
  
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
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
      
        {allMessages.map((i,index) => (
          <MessageComponent key={i._id || index} message={i} user={user} />
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
          bgcolor={matBlack}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
            color:"white",
              rotate: "30deg",
            }}


            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: lightGreen,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: lightGreen,
              },
            }}
          >
            <SendIcon sx={{color:matBlack}} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
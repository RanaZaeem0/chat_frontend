import { Box, Stack, Typography } from "@mui/material";
import  { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";
import { lightblack, matBlack } from "../../constants/color";

interface ChatItemSchema {
  avatar: [];
  name: string;
  sameSender: boolean;
  _id: string;
  groupChat: boolean;
  isOnline: string;
  newMessage: any;
  index: number;
  handleDeleteChat: (e:any, _id:any, groupChat:boolean) => void;
}

function ChatItem({
  avatar = [],
  name,
  sameSender,
  _id,
  groupChat = false,
  isOnline,
  index,
  handleDeleteChat,
}: ChatItemSchema) {
  return (
    <Link
      to={`/chat/${_id}`}
      key={index}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        className=""
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "start",
          paddingLeft: "1rem",
          height: "3rem",
          textDecoration: "none",
          justifyContent: "start",
          color: sameSender ? "black" : "white",
          backgroundColor: sameSender ? lightblack : matBlack,
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "10%",
                backgroundColor: "green",
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
              }}
            ></Box>
          )}
        </Stack>
      </div>
    </Link>
  );
}

export default memo(ChatItem);

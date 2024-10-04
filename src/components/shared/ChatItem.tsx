import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";


 function ChatItem({
  avatar = [],
  name,
  sameSender,
  _id,
  groupChat = false,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChat,
}) {
  return (
    <Link
      
    to={`/chat/${_id}`}
    index={index}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div

        className=""
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "start",
          paddingLeft:"1rem",
          height: "3rem",
          textDecoration: "none",
          justifyContent: "start",
          color: sameSender ? "white" : "black",
          backgroundColor: sameSender ? "black" : "white",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar}  />
        <Stack>
          <Typography>{name }</Typography>
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
            >
                
            </Box>
          )}
        </Stack>
      </div>
    </Link>
  );
}

export default memo(ChatItem)

import { Box, Typography } from "@mui/material";
import  { memo } from "react";
import {  lightblack,  lightGreen } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features.ts";
import {RenderAttachment} from "../shared/RenderAttachment.tsx";
import { motion } from "framer-motion";
import { UserDataType } from "../../types/types.ts";

const MessageComponent = ({ message, user,key }:{
  message:any,
  user:UserDataType,
  key:any
}) => {
  const { sender, content, attachments = [], createdAt } = message;


  

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? lightGreen:lightblack ,
        color: "white",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
      key={key}
    >
  

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment:any, index:number) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);

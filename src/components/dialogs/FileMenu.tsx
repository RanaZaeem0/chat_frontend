import React, { useRef } from "react";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";

import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast, { ToastIcon } from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";

export default function FileMenu({ anchorE1, chatId }) {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const [sendAttachment] = useSendAttachmentsMutation();

  const fileChangeHandler = (e, key) => {
    console.log(Array(e.target.files),"file");
    
    try {
      const files = Array.from(e.target.files.length);
      if (files.length < 0) {
        return toast.error(`plz add ${key}`);
      }
      if (files.length > 5) {
        return toast.error(`Plz Select less ${key} `);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong ");
    }
  };
  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();
  const closeFileMenu = () => dispatch(setIsFileMenu(false));
    console.log(selectImage);
    
  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
}

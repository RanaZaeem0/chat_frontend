import  { useRef } from "react";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";

import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,

  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";
import { RootState } from "../../redux/reducers/store";

export default function FileMenu({ anchorE1, chatId }:{
  chatId:string,
  anchorE1:any
}) {
  const imageRef = useRef<HTMLInputElement | null>(null);;
  const audioRef = useRef<HTMLInputElement | null>(null);;
  const videoRef = useRef<HTMLInputElement | null>(null);;
  const fileRef = useRef<HTMLInputElement | null>(null);;

  const { isFileMenu } = useSelector((state:RootState) => state.misc);

  const dispatch = useDispatch();

  const [sendAttachment] = useSendAttachmentsMutation();

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>, key:any) => {
    try {
      dispatch(setIsFileMenu(false))
      const toastId = toast.loading("sending files");
      const files: File[] = Array.from(e.target.files || []);
      console.log(files, "file");

      if (files.length < 0) {
        return toast.error(`plz add ${key}`);
      }
      if (files.length > 5) {
        return toast.error(`Plz Select less ${key} `);
      }

      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));
      console.log("file,", files);

      const res = await sendAttachment(myForm);
      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
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

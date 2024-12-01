import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import  { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { RootState } from "../../redux/reducers/store";
import toast from "react-hot-toast";

const Notifications = () => {
  const [friendRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async (e:any) => {
    try {
      const response = await friendRequest(e);
      const toastId = toast.loading("upadating data...");
      if (
        response?.data.statusCode >= 200 &&
        response?.data.statusCode <= 300
      ) {
        {
          toast.success(response?.data.message, { id: toastId });
          dispatch(setIsNotification(false));
        }
      }else{
        toast.error("Somthing went wrong", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { isNotification } = useSelector((state:RootState) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, } = useGetNotificationsQuery({});

  const closeHandlerNotifiaction = () => {
    dispatch(setIsNotification(false));
  };

  return (
    <Dialog open={isNotification} onClose={closeHandlerNotifiaction}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.data?.length > 0 ? (
              data?.data?.map((i:any) => (
                <NotificationItem
                  sender={i.sender}
                  _id={i._id}
                  handler={friendRequestHandler}
                  key={i._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler,key }:{
  sender:any,
  _id:string,
  handler:({ requestId, accept }:{
    requestId:string,
    accept:boolean
  })=>void,
  key:any
}) => {
  const { name, avatar } = sender;
  console.log(avatar);
  
  return (
    <ListItem key={key}> 
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ requestId: _id, accept: true })}>
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handler({ requestId: _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;

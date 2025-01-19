import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { handleApiError } from "../../lib/features";
export default function Search() {
  const [search, setSearch] = useState("");
  const { isSearch } = useSelector((state: any) => state.misc);
  const dispatch = useDispatch();

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [users, setusers] = useState([]);
  const addFriendHandler = async (userId: any) => {


    sendFriendRequest({ userId }) .then((res) => {
      const taostid = toast.loading("sending !")
      if (!res.error) {
        toast.success(res.data.message,{id:taostid});
      } else {
        handleApiError(res,taostid)
      }
    })
    .catch((res) => {
      console.log(res);

    });
  };

  const [userSearcher] = useLazySearchUserQuery();

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      const toastId = toast.loading("search ")
      userSearcher(search)
      .then((res) => {

          if (res.isSuccess) {
            setusers(res.data.data);
            toast.success(res.data.message,{id:toastId});
          } else {
            // handleApiError(res,toastId)
            toast.error(res.data.message,{id:toastId});
          
          }
        })
        .catch((res) => {
          console.log(res);
          toast.error("Retry",{id:toastId});

        });
    }, 500);

    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [search.length > 1]);


  const addFriendHandlerIsLoading = false

  const handleCloseSearch = () => {
    dispatch(setIsSearch(false));
  };

  return (
    <Dialog open={isSearch} onClose={handleCloseSearch}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find Prople</DialogTitle>
        <TextField
          label=""
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user, index) => {
            return (
              <UserItem
                user={user}
                key={index}
                handler={addFriendHandler}
                handlerIsLoading={addFriendHandlerIsLoading}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
}

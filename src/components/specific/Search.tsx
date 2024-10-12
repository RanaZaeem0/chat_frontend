import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon, Token } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sample";
import axios from "axios";
import { authApi, getToken } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { Server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";
export default function Search() {
  const [search, setSearch] = useState("");
  const { isSearch } = useSelector((state: any) => state.misc);
  const dispatch = useDispatch();

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

  const addFriendHandler = async (userId) => {
    console.log("id", userId);


    sendFriendRequest({userId});
  };

  const [userSearcher] = useLazySearchUserQuery();

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      userSearcher(search)
        .then((res) => {
          console.log(res.data.data);
          setusers(res.data.data);
          toast.success(res.data.message);
        })
        .catch((res) => {
          console.log(res);
        });
    }, 500);

    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [search]);


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
          {users.map((user,index) => {
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

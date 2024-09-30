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
import { useLazySearchUserQuery } from "../../redux/api/api";
import toast from "react-hot-toast";
export default function Search() {

  const [search,setSearch] = useState('')
  const {isSearch} =  useSelector((state:any)=>state.misc)
  const dispatch = useDispatch()

  const [loadingBtn,setLoadingBtn] = useState(true)
    const [error,setError] = useState('')
  const navigate = useNavigate()
  const [users,setusers]= useState([])
  

  const addFriendHandler = async (userId) => {
    try {
    
 
       console.log(userId);
 
       const response = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}user/sendFriendRequest`,
          userId
         ,{
          withCredentials:true
         }
       
       );
       console.log(response);
 
       if (response.status >= 200 && response.status < 300) {
         setLoadingBtn(false);
    
 
         navigate("/");
       }
     } catch (error: any) {
       if (error.response) {
         setLoadingBtn(false);
 
         // Server responded with a status other than 200 range
         console.log(
           `Error response from server: ${error.response.status} - ${error.response.data}`
         );
         setError(`Error: ${error.response.data.message || "Server Error"}`);
       } else if (error.request) {
         // No response received from server
         console.log("No response received from server", error.request);
         setError("No response received from server. Please try again later.");
       } else {
         // Other errors
         console.log(`Error during signup: ${error.message}`);
         setError(`Error: ${error.message}`);
       }
  };
}

const [userSearcher] = useLazySearchUserQuery()


useEffect(()=>{

  const setTimeOutId = setTimeout(() => {
  userSearcher(search).then(res =>{
    console.log(res.data.data);
    setusers(res.data.data)
    toast.success(res.data.message)
    
  }).catch(res=>{
    console.log(res);
    
  })  
  }, 500);

  return ()=>{
    clearTimeout(setTimeOutId)
  }

},[search])




  const addFriendHandlerIsLoading = false;


  const handleCloseSearch  = ()=>{
    dispatch(setIsSearch(false))
  }

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
          {users.map((user) => {
            return (
              <UserItem
                user={user}
                key={user._id}
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

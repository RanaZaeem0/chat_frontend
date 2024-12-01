import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../../constants/sample";
import UserItem from "../shared/UserItem";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/misc";
import { RootState } from "../../redux/reducers/store";

const NewGroup = () => {

  const {isNewGroup} = useSelector((state:RootState)=> state.misc)
  const dispatch = useDispatch();
  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [isLoadingNewGroup,setIsLoadingNewGroup] = useState(false);

  const UserFriend = sampleUsers;

  const selectMemberHandler = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id) // Remove member
        : [...prev, id] // Add member
    );
  };

  
  const closeHandlerNewGroup = () => {
    dispatch(setIsNewGroup(false))
  }


  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");
    setIsLoadingNewGroup(false)

    closeHandlerNewGroup();
  };



  return (
    <Dialog open={isNewGroup} onClose={closeHandlerNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1">Members</Typography>

        <Stack>
          {!UserFriend ? (
            <Skeleton />
          ) : (
            UserFriend.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handlerIsLoading={true}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandlerNewGroup}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;

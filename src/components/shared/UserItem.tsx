import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
function UserItem({ user, handler, handlerIsLoading }) {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography variant="body1" display={"-webkit-box"}
        overflow={'hidden'}
        className="bg-red-200 w-full " 
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default UserItem;

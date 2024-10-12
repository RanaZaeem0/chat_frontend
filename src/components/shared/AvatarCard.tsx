import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";

function AvatarCard({ avatar = [], max = 4 }) {

  
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box height={"3rem"}>
          {avatar &&
            avatar.map((i, index) => {
              return (
                <Avatar
                  key={Math.random() * 100}
                  src={i}
                  alt={`Avatar ${index}`}
                  sx={{
                    position: "absolute",
                    left: {
                      xs: `${0.5 + index}rem`,
                      sm: `${index}rem`,
                    },
                    width: "2rem",
                    height: "2rem",
                    border: "2px solid white",
                  }}
                />
              );
            })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
}

export default AvatarCard;

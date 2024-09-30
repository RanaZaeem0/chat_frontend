import { Avatar, Stack,Typography} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {


  const userDetails = useSelector((state)=> state.auth)


  console.log(userDetails.user);
  

if(!userDetails.loader){
  return (
    <div className="">loading ..</div>
  )
}

  
  return (
    <Stack sx={
      {
        backgroundColor:"gray"
      }
    }>
        <Avatar
        sx={{
            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid black",
            backgroundColor:"gray"
        }}
        />
        <ProfileCard text={'username'} Heading={`${userDetails.user.username}`}/>
        <ProfileCard text={'Bio'} Heading={`${userDetails.user.bio}`}/>
        <ProfileCard text={'Name'} Heading={`${userDetails.user.name}`}/>
    </Stack>
  )
}

const  ProfileCard = ({
  text, Icon, Heading
}:{
  text:string;
  Icon?:any;
  Heading:string
})=> {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      padding={"1rem"}>
      <Stack>
        {Icon && Icon}
        <Typography>{text}</Typography>
        <Typography className='text-white'  >{Heading}</Typography>
      </Stack>
    </Stack>
  )
}

export default Profile
import { Avatar, Stack,Typography} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {


  const {user,loader} = useSelector((state)=> state.auth)


  



  
  return (
    <Stack sx={
      {
        backgroundColor:"gray"
      }
    }>
        <Avatar
        src={user?.avatar}
        sx={{
            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid black",
            backgroundColor:"gray"
        }}
        />
     
     {!loader ? <h1>loading</h1> :<>
      <ProfileCard text={'username'} Heading={`${user?.username}`}/>
        <ProfileCard text={'Bio'} Heading={`${user?.bio}`}/>
        <ProfileCard text={'Name'} Heading={`${user?.name}`}/></>}
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
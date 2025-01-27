import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/store';
import { Avatar } from '@mui/material';

function ChatHeader({isTyping,user}) {

  console.log(user,"user");
  
if(isTyping){
    console.log("not");
    
}else{
    console.log("yes");
    
}
  return (
    <div className='text-white p-4 relative bg-zinc-800  '>
        <Avatar
                  key={Math.random() * 100}
                  src={user?.avatar || ""}
                  alt={`imge`}
                  sx={{
                    position: "absolute",
                    left:"10px",
                    width: "2rem",
                    height: "2rem",
                    border: "2px solid white",
                  }}
                />

      <h2 className='pl-10'>{user?.name.split('-')[0] || "name"} {isTyping && "typing..."}</h2>
    </div>
  )
}

export default ChatHeader

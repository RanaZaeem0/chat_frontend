
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/store';

function ChatHeader({isTyping,user}:{
  isTyping:boolean,
  user:any
}) {

  console.log(user,"user");
  const authDetails = useSelector((state:RootState)=> state.auth)

  if (!user || !authDetails.user) return null;

  // Split the name into parts
  const [firstName, secondName] = user.name.split('-');

  // Determine the name to display based on the logged-in user
  const displayName =
    authDetails.user.name === firstName ? secondName : firstName;
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

      <h2 className='pl-10'>{displayName  || "name"} {isTyping && "typing..."}</h2>
    </div>
  )
}

export default ChatHeader

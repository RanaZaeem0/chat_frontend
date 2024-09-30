import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";


const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });


  const Link = styled(LinkComponent)`
  text-decoration:none;
  color:black;
  paddind:0.5rem,
  &:hover{
  text-decoration:"none"
  }
  `

  const bounceAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
  `;
  const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounceAnimation} 1s infinite`,
  }));

export {
    VisuallyHiddenInput,
    BouncingSkeleton,
    Link
    
}

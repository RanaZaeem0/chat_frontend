import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import {  matBlack } from "../../constants/color";


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

  const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color:white;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${matBlack};
`;

export {
    VisuallyHiddenInput,
    BouncingSkeleton,
    Link,
    InputBox
    
}

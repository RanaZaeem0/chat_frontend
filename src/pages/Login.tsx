import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExited } from "../redux/reducers/auth";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const Naviagte = useNavigate();
  const dispatch= useDispatch()
  const [loadingBtn, setLoadingBtn] = useState(false);
  interface CreateuserSchema {
    name: string;
    username: string;
    password: string;
    avatar: File;
    bio: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  interface loginSchema {
    username:string,
    password:string
  }

  const avatar = watch("avatar");
  const avatarPreview =
    avatar && avatar[0] ? URL.createObjectURL(avatar[0]) : "avatar";

  const createUser = async (data: CreateuserSchema) => {
    setLoadingBtn(true);
    try {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("bio", data.bio);
      formData.append("name", data.name);
      formData.append("avatar", data.avatar[0]);
      formData.append("password", data.password);

      console.log(formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/new`,
        formData,
        {
          withCredentials:true
        }
      );
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        dispatch(userExited(response.data.data))
        Naviagte("/");
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
    }
  };


  const loginUser = async (data:loginSchema)=> {
    try {
      
     const {username ,password} = data

      console.log(data);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/login`,
        data,
        {
            withCredentials: true,
          }    
      );

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
       
       dispatch(userExited(response.data.data))
        toast.success(response.data.message)

        Naviagte("/");
      }
    } catch (error: any) {
   
      
      if (error.response) {
        toast.error(error.response.message)
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
    }

  }

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container
    className="bg-black text-white"
      component="main"
      maxWidth="xs"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <div className="flex item-center flex-col justify-center ">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className="" onSubmit={handleSubmit(loginUser)}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                type="text"
                variant="outlined"
                className="!text-white"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/, // pattern for no spaces or special characters
                    message: "Username must contain only letters and numbers",
                  },
                })}
              ></TextField>
              {errors.username && (
                <Typography variant="body2" color="error">
                  {errors.username.message}
                </Typography>
              )}
               <TextField
                margin="normal"
                required
                fullWidth
                label="password"
                type="password"
                variant="outlined"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              ></TextField>
              {errors.password && (
                <Typography variant="body2" color="error">
                  Plz make strong password and lastest 6 carateer
                </Typography>
              )}
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
            <Button
              sx={{ marginTop: 2 }}
              fullWidth
              variant="text"
              onClick={handleLogin}
            >
              or signup
            </Button>
          </div>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              SignUp{" "}
            </Typography>
            <form onSubmit={handleSubmit(createUser)}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatarPreview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      {...register("avatar", {
                        required: true,
                      })}
                    />
                    {errors && (
                      <Typography variant="body2" color="error">
                        {errors.avatar?.message}
                      </Typography>
                    )}
                  </>
                </IconButton>
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                label="name"
                variant="outlined"
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
              ></TextField>
              {errors && (
                <Typography variant="body2" color="error">
                  {errors.name?.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Bio"
                type="text"
                variant="outlined"
                {...register("bio", {
                  required: true,
                  minLength: 2,
                })}
              ></TextField>
              {errors && (
                <Typography variant="body2" color="error">
                  {errors.bio?.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                type="text"
                variant="outlined"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/, // pattern for no spaces or special characters
                    message: "Username must contain only letters and numbers",
                  },
                })}
              ></TextField>
              {errors.username && (
                <Typography variant="body2" color="error">
                  {errors.username.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="password"
                type="password"
                variant="outlined"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              ></TextField>
              {errors.password && (
                <Typography variant="body2" color="error">
                  Plz make strong password and lastest 6 carateer
                </Typography>
              )}
              <Button variant="contained" type="submit">
                SignUp{" "}
              </Button>
            </form>
            <Button
              sx={{ marginTop: 2 }}
              fullWidth
              variant="text"
              onClick={handleLogin}
            >
              or Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

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
import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExited } from "../redux/reducers/auth";
import { handleApiError } from "../lib/features";
import { loginPageImg } from "../assets";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Typing the forms
  interface CreateuserSchema {
    name: string;
    username: string;
    password: string;
    avatar: File;
    bio: string;
  }

  interface loginSchema {
    username: string;
    password: string;
  }

  // Use the `useForm` hook with the appropriate schema type
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateuserSchema | loginSchema>();

  const avatar = watch("avatar") as File;
  const avatarPreview =
    avatar && avatar ? URL.createObjectURL(avatar) : "avatar";

  const createUser: SubmitHandler<CreateuserSchema> = async (data: CreateuserSchema) => {
    setLoadingBtn(true);
    try {
<<<<<<< HEAD
      const userData =data
=======
      const userData = {
        username: data.username,
        password: data.password,
        bio: data.bio,
        name: data.name,
      };
>>>>>>> parent of 34aea01 (addd)

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/new`,
        userData,
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        dispatch(userExited(response.data.data));
        navigate("/");
      }else{
      handleApiError(response)
      }
    } catch (error: any) {
      setLoadingBtn(false);
      toast.error(`${error.response.data.message || "cheak input"}`)
    }
  };

  const loginUser: SubmitHandler<loginSchema> = async (data) => {
    setLoadingBtn(true);
   
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/login`,
        data,
        {
          withCredentials: true,
        }
      );
  console.log(response,"login response");
      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        dispatch(userExited(response.data.data));
        console.log(response.data.data.refreshToken,"token");
        
        localStorage.setItem('authToken',response.data.data.refreshToken)
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error:any) {
      setLoadingBtn(false)

toast.error(`${error.response.data.message || "cheak input"}`)
      console.log(error?.response);
      
    }


  };

  const handleSubmitForm = (data: CreateuserSchema | loginSchema) => {
    if (isLogin) {
      loginUser(data as loginSchema);  // Type assertion for login schema
    } else {
      createUser(data as CreateuserSchema);  // Type assertion for createuser schema
    }
  };

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container
      className="bg-orange-50 text-white "
      component="main"
      sx={{
        width: "100%",
        paddingLeft:"0px"
        ,paddingRight:"0px",
        marginRight:"0px",
        marginLeft:"0px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginPageImg})`, // Replace with your image path
    backgroundSize: "cover", // Ensure the image covers the entire background
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      <Paper
      className="!shadow-md  !bg-transparent"
        elevation={2}
        sx={{
          padding: 4,
          borderRadius:"10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <div className="flex item-center flex-col justify-center ">
            <Typography component="h1" variant="h5" className="items-center justify-center flex ">
              Login
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
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
              />
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
              />
              {errors.password && (
                <Typography variant="body2" color="error">
                  Password must be at least 6 characters long
                </Typography>
              )}
              <Button variant="contained" type="submit" className="!rounded-xl !font-normal  !flex !items-center !justify-center !bg-purple-400">
                {loadingBtn ? "Loading..." : "Login"}
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
          <div className="w-96 ">
            <Typography component="h1" variant="h5">
              SignUp
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {/* <Stack position={"relative"} width={"10rem"} margin={"auto"}>
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
                  <CameraAltIcon />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    {...register("avatar", { required: true })}
                  />
                  {errors && (
                    <Typography variant="body2" color="error">
                      Avatar is required
                    </Typography>
                  )}
                </IconButton>
              </Stack>  */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="name"
                variant="outlined"
                {...register("name", { required: true, minLength: 2 })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Bio"
                type="text"
                variant="outlined"
                {...register("bio", { required: true, minLength: 2 })}
              />
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
              />
              {errors.username && (
                <Typography variant="body2" color="error">
                  Username must contain only letters and numbers
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
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <Typography variant="body2" color="error">
                  Password must be at least 6 characters long
                </Typography>
              )}
              <Button
                sx={{
                  width: "100%",
                  marginTop: 2,
                  padding: 1.5,
                  backgroundColor: "#0055AA",
                }}
                variant="contained"
                type="submit"
              >
                {loadingBtn ? "Loading..." : "Create Account"}
              </Button>
            </form>
            <Button
              sx={{ marginTop: 2 }}
              fullWidth
              variant="text"
              onClick={handleLogin}
            >
              or login
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
}

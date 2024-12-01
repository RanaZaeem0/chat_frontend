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

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
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

  console.log(error);

  const avatar = watch("avatar") as File;
  const avatarPreview =
    avatar && avatar ? URL.createObjectURL(avatar) : "avatar";

  const createUser: SubmitHandler<CreateuserSchema> = async (data:CreateuserSchema) => {
    setLoadingBtn(true);
    try {
      const userData = {
        username: data.username,
        password: data.password,
        bio: data.bio,
        name: data.name,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/new`,
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        dispatch(userExited(response.data.data));
        navigate("/");
      }
    } catch (error: any) {
      setLoadingBtn(false);
      if (error.response) {
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        console.log("No response received from server", error.request);
        setError("No response received from server. Please try again later.");
      } else {
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
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

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        dispatch(userExited(response.data.data));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error: any) {
      setLoadingBtn(false);
      if (error.response) {
        toast.error(error.response.message);
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        console.log("No response received from server", error.request);
        setError("No response received from server. Please try again later.");
      } else {
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    }
  };

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container
      className="bg-black text-white"
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"black"
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
          <div className="flex item-center flex-col justify-center  ">
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
                  <CameraAltIcon />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    {...register("avatar", { required: true })}
                  />
                  {errors.avatar && (
                    <Typography variant="body2" color="error">
                      Avatar is required
                    </Typography>
                  )}
                </IconButton>
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                label="name"
                variant="outlined"
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors && (
                <Typography variant="body2" color="error">
                  adas
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Bio"
                type="text"
                variant="outlined"
                {...register("bio", { required: true, minLength: 2 })}
              />
              {errors.bio && (
                <Typography variant="body2" color="error">
                  Bio is required
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
                  Password is required and must be at least 6 characters
                </Typography>
              )}
              <Button
                sx={{
                  width: "100%",
                  marginTop: 2,
                  padding: "10px",
                  backgroundColor: "red",
                }}
                variant="contained"
                type="submit"
              >
                {loadingBtn ? "Loading..." : "SignUp"}
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
          </>
        )}
      </Paper>
    </Container>
  );
}

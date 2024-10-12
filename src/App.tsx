import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes, useParams } from "react-router-dom";
import { ProtectRoute } from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loader";
import axios from "axios";
import { Server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExited, userNotExited } from "./redux/reducers/auth";
import toast, { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

interface UserData {
  _id: string;
  fullName: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  avatar: {
    url: string;
    public_id: string;
  };
}

function App() {
  const { loader, user }:{
    user:UserData
    loader:boolean
  } = useSelector((state) => state.auth);


 
  

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${Server}user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(userExited(res.data.data));
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("exit erooor");

        dispatch(userNotExited());
      });
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;

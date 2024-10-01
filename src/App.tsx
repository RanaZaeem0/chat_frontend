import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Router, Routes } from "react-router-dom";
import { ProtectRoute } from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loader";
import axios from "axios";
import { Server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExited, userNotExited } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chats"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { loader, user } = useSelector((state) => state.auth);
  console.log(user,"i am user");

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${Server}user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("enter");
          console.log(res.data.data);
          dispatch(userExited(res.data.data));
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
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chats />} />
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

import { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ProtectRoute } from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loader";
import axios from "axios";
import { Server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExited, userNotExited } from "./redux/reducers/auth";
import toast, { Toaster } from "react-hot-toast";
import {RootState} from "./redux/reducers/store"
import Contact from "./pages/Contact";
import LoginTest from "./pages/login1";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${Server}user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(userExited(res.data.data));
          if (!user) {
            toast.success(res.data.message);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(userNotExited());
      });
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
                <ProtectRoute user={user} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Contact />} />
          </Route>
          <Route
            path="/login"
            element={
            <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login1" element={<LoginTest />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Settings from "./pages/Settings";
import CreateProduct from "./pages/CreateProduct";
import User from "./pages/User";
import DisplayProduct from "./pages/DisplayProduct";
import Messages from "./pages/Messages";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setAccessToken, selectAccessToken } from "./redux/slices/authSlice";
import MyBooks from "./pages/MyBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="profile" element={<Settings />} />
        <Route path="addproduct" element={<CreateProduct />} />
        <Route path="product/:id" element={<DisplayProduct />} />
        <Route path="messages/received/:userId" element={<Messages />} />

        <Route path="test" element={<Test />} />
        {/* protected routes */}
        <Route path="mybooks" element={<MyBooks />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

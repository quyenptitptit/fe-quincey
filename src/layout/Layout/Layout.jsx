import React, {useState, useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Popup from "../../components/Popup/Popup";
import ToastMess from "../../components/ToastMess/ToastMess";
import Loading from "../../components/Loading/Loading";
import Alert from "../../components/Alert/Alert";

function Layout() {
  const location = useLocation().pathname.split("/")
  // console.log(location[location.length - 1])
  const [selected, setSelected] = useState(location[location.length - 1])
  useEffect(() => {
    setSelected(location[location.length - 1])
  }, [location]);
  return (
    <div>
      <Alert />
      <ToastMess />
      <Popup />
      <Loading />
      <Header selected={selected} setSelected={setSelected} />
      <Navbar selected={selected} setSelected={setSelected} />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

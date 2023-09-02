import { styles } from "./Theme";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaSignOutAlt } from "react-icons/fa";
import { getEmail, useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { logout } from "../store/user/userSlice";

const DesktopNavigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isAuth = useAuth();
  const email = getEmail();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("You logged out!");
    navigate("/");
  };
  return (
    <>
      {isAuth && (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          sx={styles.tabs}
        >
          <Tab sx={styles.tab} label="Home" component={Link} to="/" />
          <Tab
            sx={styles.tab}
            label="Transactions"
            component={Link}
            to="/transactions"
          />
          <Tab
            sx={styles.tab}
            label="Categories"
            component={Link}
            to="/categories"
          />
          <div className="flex items-center justify-center">
            <Button variant="outlined" onClick={logoutHandler}>
              Logout
              <FaSignOutAlt />
            </Button>
          </div>
        </Tabs>
      )}
      {!isAuth && (
        <Link
          className="py-2 ml-auto text-white/50 hover:text-white px-3"
          to={"auth"}
        >
          Log In / Sign In
        </Link>
      )}
    </>
  );
};

export default DesktopNavigation;

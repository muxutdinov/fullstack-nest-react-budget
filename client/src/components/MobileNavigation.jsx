import React from "react";
import { styles } from "./Theme";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { FaSignOutAlt } from "react-icons/fa";
import { getEmail, useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { logout } from "../store/user/userSlice";

const MobileNavigation = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

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
    <React.Fragment>
      {isAuth && (
        <>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
          >
            <Box sx={styles.toolbarMargin} />
            <Paper>
              <List disablePadding>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "text-green-600" : "text-blue-600"
                  }
                >
                  <ListItem
                    divider
                    component={Link}
                    to="/"
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemText disableTypography>Home</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to={"/transactions"}
                  className={({ isActive }) =>
                    isActive ? "text-green-600" : "text-blue-600"
                  }
                >
                  <ListItem
                    divider
                    component={Link}
                    to="/transactions"
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemText disableTypography>Transactions</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to={"/categories"}
                  className={({ isActive }) =>
                    isActive ? "text-green-600" : "text-blue-600"
                  }
                >
                  <ListItem
                    divider
                    component={Link}
                    to="/categories"
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemText disableTypography>Categories</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to={"/auth"}
                  className={({ isActive }) =>
                    isActive ? "text-green-600" : "text-blue-600"
                  }
                >
                  <ListItem
                    divider
                    component={Link}
                    to="/auth"
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemText onClick={logoutHandler} disableTypography>
                      Logout{" "}
                      <span>
                        <FaSignOutAlt />
                      </span>
                    </ListItemText>
                  </ListItem>
                </NavLink>
              </List>
            </Paper>
          </SwipeableDrawer>
          <IconButton
            sx={styles.menuIconContainer}
            onClick={() => setOpenDrawer(!openDrawer)}
            disableRipple
          >
            <MenuIcon sx={styles.hamburgerMenuIcon} />
          </IconButton>
        </>
      )}
      {!isAuth && (
        <Link
          className="py-2 ml-auto text-white/50 hover:text-white px-3"
          to={"auth"}
        >
          Log In / Sign In
        </Link>
      )}
    </React.Fragment>
  );
};

export default MobileNavigation;

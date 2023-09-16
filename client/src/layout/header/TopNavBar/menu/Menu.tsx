import React, { useCallback } from 'react';
import {
  Menu as MuiMenu,
  Box,
  MenuItem
} from "@mui/material";
import MenuLink from "./MenuLink";
import { useUser } from "../../../../users/providers/UserProvider";
import ROUTES from "../../../../routes/routesModel";
import useAxios from "../../../../hooks/useAxios";
import { removeToken } from '../../../../users/service/localStorage';

type Props = {
  isOpen: boolean;
  anchorEl: HTMLElement;
  onClose: () => void;
};

const Menu: React.FC<Props> = ({ isOpen, anchorEl, onClose }) => {
 
  useAxios();
  const { user, setUser } = useUser();

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <Box>
        <MenuLink
          label="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <MenuLink
              label="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              label="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        )}
        {user && (
          <>
            <MenuLink label="profile" navigateTo={"/"} onClick={onClose} />
            <MenuLink label="edit account" navigateTo={`${ROUTES.EDIT_USER}/${user._id}`} onClick={onClose} />

            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;

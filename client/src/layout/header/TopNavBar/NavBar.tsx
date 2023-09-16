import React from "react";
import { AppBar, Box, Container } from "@mui/material";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";
import SearchBar from "./search-bar/SearchBar";
import { MenuProvider } from "./menu/MenuProvider";

export const NavBar = () => {
  return (
    <MenuProvider>
      <AppBar position="sticky">
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              alignItems: "center",
            }}>
            <LeftNavBar />

            <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
              <SearchBar />
            </Box>

            <RightNavBar />
          </Box>
        </Container>
      </AppBar>
    </MenuProvider>
  );
};

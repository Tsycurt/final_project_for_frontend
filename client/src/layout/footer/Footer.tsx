import React from "react";
import { 
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";
import { 
  Favorite as FavoriteIcon,
  Info as InfoIcon,
  Portrait as PortraitIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />

        {user && (
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={() => navigate(ROUTES.FAV_CARDS)}
          />
        )}

        {user && user.isBusiness && (
          <BottomNavigationAction
            label="My Cards"
            icon={<PortraitIcon />}
            onClick={() => navigate(ROUTES.MY_CARDS)}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;

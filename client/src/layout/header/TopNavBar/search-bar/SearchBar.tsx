import React from "react";
import { 
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../../../providers/ThemeProvider";

const SearchBar = () => {
  const { isDark } = useTheme();
  return (
    <Box display="inline-flex">
      <FormControl variant="standard">
        <OutlinedInput
          sx={{ backgroundColor: !isDark ? "#ffffff" : "#333333" }}
          placeholder="Search"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;

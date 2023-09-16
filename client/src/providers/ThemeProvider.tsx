import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

type ContextArgs = {
  isDark: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = useCallback(() => setDark((prev) => !prev), [setDark]);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#000" : "#f0f0f0"; 
  }, [isDark]);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#134867", 
      },
    },
  });

  const value = useMemo(() => {
    return { isDark, toggleDarkMode };
  }, [isDark, toggleDarkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

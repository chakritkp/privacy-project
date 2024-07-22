import React, { createContext, ReactNode, useContext, useState } from "react";
import { ThemeProvider } from "@mui/material";
import * as theme from "../theme/theme.ts";

interface ThemeModeContextType {
  mode: boolean;
  setMode: (mode: boolean) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: false,
  setMode: () => {},
});

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<boolean>(true);
  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={mode ? theme.lightTheme : theme.darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};

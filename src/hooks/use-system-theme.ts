import { Dispatch, SetStateAction, useMemo } from "react";

import { useTheme } from "next-themes";

type Theme = "light" | "dark";
type SetTheme = Dispatch<SetStateAction<string>>;

export default function useSystemTheme() {
  const { theme, setTheme, systemTheme } = useTheme();

  return useMemo(() => {
    return {
      theme: theme === "system" ? systemTheme : theme,
      setTheme,
    } as { theme: Theme; setTheme: SetTheme };
  }, [theme, setTheme, systemTheme]);
}

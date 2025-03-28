import { AuthProvider } from "@v0/auth/providers";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "./theme-provider";

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

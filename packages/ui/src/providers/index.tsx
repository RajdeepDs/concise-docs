import { AuthProvider } from "@concise-docs/auth/providers";
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

import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "../components/sonner";
import { TooltipProvider } from "../components/tooltip";
import { ThemeProvider } from "./theme-provider";

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster richColors/>
  </ThemeProvider>
);

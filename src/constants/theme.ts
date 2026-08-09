import { createTheme } from "@mui/material/styles";

export const colors = {
  bg: "#0a0a0b",
  bgElevated: "#111113",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.09)",
  borderHover: "rgba(255,255,255,0.18)",
  text: "#f2f1ed",
  textMuted: "rgba(242,241,237,0.62)",
  textFaint: "rgba(242,241,237,0.38)",
  accent: "#ff4e2d",
  accentSoft: "rgba(255,78,45,0.14)",
  accent2: "#8bff5c",
  cream: "#f5f3ee",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: colors.bg,
      paper: colors.bgElevated,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
    },
    primary: {
      main: colors.accent,
    },
    secondary: {
      main: colors.accent2,
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
    h2: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
    h3: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
    h4: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
    h5: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
    h6: { fontFamily: '"Bricolage Grotesque", "Inter", sans-serif' },
  },
  shape: {
    borderRadius: 16,
  },
});

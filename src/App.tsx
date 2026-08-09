import { lazy, Suspense } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./constants/theme";
import SmoothScrollProvider from "./components/layout/SmoothScrollProvider";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import CustomCursor from "./components/common/CustomCursor";
import NoiseOverlay from "./components/common/NoiseOverlay";
import Hero from "./components/sections/Hero/Hero";

const About = lazy(() => import("./components/sections/About/About"));
const Skills = lazy(() => import("./components/sections/Skills/Skills"));
const Projects = lazy(() => import("./components/sections/Projects/Projects"));
const Journey = lazy(() => import("./components/sections/Experience/Journey"));
const Writing = lazy(() => import("./components/sections/Writing/Writing"));
const Contact = lazy(() => import("./components/sections/Contact/Contact"));
const Footer = lazy(() => import("./components/sections/Footer/Footer"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SmoothScrollProvider>
        <CustomCursor />
        <NoiseOverlay />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <About />
          </Suspense>
          <Suspense fallback={null}>
            <Skills />
          </Suspense>
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Suspense fallback={null}>
            <Journey />
          </Suspense>
          <Suspense fallback={null}>
            <Writing />
          </Suspense>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </main>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;

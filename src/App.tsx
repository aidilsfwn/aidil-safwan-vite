import {
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
} from "./layouts/sections";
import { FloatingDock, Sidebar, SnapSection } from "./components";
import { MotionProvider } from "./context/MotionContext";

export default function App() {
  return (
    <MotionProvider>
      <div className="flex overflow-hidden bg-ink" style={{ height: "100dvh" }}>
        <Sidebar className="hidden md:flex" />
        <main
          id="scroll-container"
          className="flex-1 overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", height: "100dvh" }}
        >
          <SnapSection id="about">
            <Hero />
          </SnapSection>
          <SnapSection id="skills">
            <Skills />
          </SnapSection>
          <SnapSection id="experience">
            <Experience />
          </SnapSection>
          <SnapSection id="education">
            <Education />
          </SnapSection>
          <SnapSection id="projects">
            <Projects />
          </SnapSection>
          <SnapSection id="contact" dark>
            <Contact />
          </SnapSection>
        </main>
        <FloatingDock className="flex md:hidden" />
      </div>
    </MotionProvider>
  );
}

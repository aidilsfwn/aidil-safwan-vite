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
        <div className="flex-1 flex flex-col overflow-hidden">
          <main
            id="scroll-container"
            className="flex-1 min-h-0 overflow-y-scroll"
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
          <FloatingDock className="flex md:hidden flex-shrink-0" />
        </div>
      </div>
    </MotionProvider>
  );
}

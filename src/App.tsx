import { useEffect, useState } from "react";
import { WorkspaceRail, CommandNavigation, Chapter, CursorGlow } from "./components";
import { Beyond, Contact, Education, Experience, Hero, Projects, Skills } from "./layouts/sections";
import { MotionProvider } from "./context/MotionContext";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const restoreHash = () => {
      const id = window.location.hash.slice(1);
      const container = document.getElementById("scroll-container");
      const section = document.getElementById(id);
      if (container && section) container.scrollTop = section.offsetTop;
    };
    const frame = window.requestAnimationFrame(restoreHash);
    window.addEventListener("hashchange", restoreHash);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", restoreHash); };
  }, []);

  return (
    <MotionProvider>
      <a className="skip-link" href="#about">Skip to portfolio</a>
      <div className="studio-shell">
        <CursorGlow />
        <WorkspaceRail />
        <CommandNavigation open={drawerOpen} setOpen={setDrawerOpen} />
        <main id="scroll-container" tabIndex={-1}>
          <Chapter id="about" index="01" label="Profile"><Hero /></Chapter>
          <Chapter id="skills" index="02" label="Capabilities"><Skills /></Chapter>
          <Chapter id="experience" index="03" label="Career signal"><Experience /></Chapter>
          <Chapter id="education" index="04" label="Education path"><Education /></Chapter>
          <Chapter id="projects" index="05" label="Work ledger"><Projects /></Chapter>
          <Chapter id="beyond" index="06" label="Off-duty signals"><Beyond /></Chapter>
          <Chapter id="contact" index="07" label="Contact"><Contact /></Chapter>
        </main>
      </div>
    </MotionProvider>
  );
}

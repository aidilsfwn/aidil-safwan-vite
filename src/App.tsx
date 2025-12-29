import {
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
} from "./layouts/sections";
import { Footer, FloatingDock } from "./components";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-indigo-500/30">
      {/* <MobileMenu /> - Disabling MobileMenu in favor of generic FloatingDock for all screens? No, let's keep it but maybe hide it on mobile if Dock is used? 
          Actually, FloatingDock works great on mobile too. Let's try fully replacing. 
      */}
      
      <FloatingDock />

      <main className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

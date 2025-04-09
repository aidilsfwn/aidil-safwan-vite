import {
  Contact,
  Education,
  Experience,
  Hero,
  // Projects,
  Skills,
} from "./layouts/sections";
import { Footer, MobileMenu, DesktopSidebar } from "./components";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileMenu />

      <DesktopSidebar />

      <main className="md:ml-64 p-6 md:p-12">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        {/* <Projects /> */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

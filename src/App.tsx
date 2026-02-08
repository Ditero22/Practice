import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Overview from "@/components/layout/Overview";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#93cbf7] -z-30"></div>
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
        <div className="absolute w-full h-full bg-gradient-to-r from-[#3B82F6] via-[#12e464] to-[#0EA5E9] opacity-70 filter blur-3xl animate-liquid1"></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-[#12e464] via-[#1CA9C9] to-[#3B82F6] opacity-60 filter blur-2xl animate-liquid2"></div>
      </div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-15">
        <Hero />
        <Overview />
        <Overview />
        <Overview />
        <Footer />
      </div>
      
    </div>
  );
}

export default App;

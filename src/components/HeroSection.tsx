import heroImage from "@/assets/hero-facade.webp";
export function HeroSection() {
  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Modern facade architecture" className="w-full h-full object-cover animate-subtle-zoom" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0" style={{
        background: "var(--hero-overlay)"
      }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-6 animate-fade-in-up">
            Experts in Render and
            <br />
             Insulation Solutions
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto animate-fade-in-up stagger-1">
            High-performance facade systems for modern buildings
          </p>
          <button onClick={handleScrollToContact} className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-sm animate-fade-in-up stagger-2">
            Request a Quote
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up stagger-3">
        <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>;
}
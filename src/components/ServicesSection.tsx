import { useEffect, useState, useRef } from "react";
import { Layers, PaintBucket, Hammer } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "External Wall Insulation",
    description: "Comprehensive EWI systems that dramatically improve thermal performance and reduce energy costs for residential and commercial buildings.",
  },
  {
    icon: PaintBucket,
    title: "Silicone Render",
    description: "Silicone render is a modern façade solution that offers excellent water resistance, breathability, and long-lasting durability, helping protect your building while maintaining a clean, premium appearance.",
  },
  {
    icon: Hammer,
    title: "Old Render Removal",
    description: "Safe and efficient removal of old render, preparing surfaces for a new, durable finish.",
  },
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary overflow-hidden relative"
    >
      {/* Warm gradient from hero colors */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, hsl(35 80% 50% / 0.06) 0%, transparent 50%), radial-gradient(ellipse at bottom right, hsl(25 70% 45% / 0.04) 0%, transparent 60%)'
        }}
      />
      
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header with reveal */}
        <div 
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert solutions for all your facade and insulation needs
          </p>
        </div>

        {/* Services Grid - 3 Cards with staggered animation */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-16 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${300 + index * 200}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/20 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[1px] rounded-lg bg-card" />
              

              {/* Subtle glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none"
                style={{
                  boxShadow: hoveredIndex === index 
                    ? '0 20px 60px -15px hsl(var(--accent) / 0.3), 0 10px 30px -10px hsl(var(--accent) / 0.2)' 
                    : '0 4px 20px -5px hsl(var(--background) / 0.5)'
                }}
              />

              {/* Card Content */}
              <div className="relative z-10 p-10 lg:p-12 h-72 flex flex-col items-center justify-center text-center">
                {/* Icon container with background */}
                <div 
                  className={`mb-8 relative transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0 scale-75 -translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                  }`}
                  style={{
                    animation: isVisible ? `iconPulse 0.6s ease-out ${600 + index * 200}ms both` : 'none'
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl scale-150" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                    <service.icon 
                      size={36} 
                      className="text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                
                <h3 
                  className={`text-xl lg:text-2xl font-medium text-foreground transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                >
                  {service.title}
                </h3>
                
                {/* Subtle indicator */}
                <div 
                  className={`mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-[1px] bg-accent/50" />
                  <span>Hover for details</span>
                  <span className="w-8 h-[1px] bg-accent/50" />
                </div>
              </div>

              {/* Hover Overlay with Description */}
              <div 
                className={`absolute inset-0 z-20 flex items-center justify-center p-8 lg:p-10 rounded-lg transition-all duration-500 ease-out ${
                  hoveredIndex === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.9) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                    <service.icon 
                      size={28} 
                      className="text-background"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-background mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base text-background/90 leading-relaxed max-w-sm mx-auto">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom keyframes for icon pulse */}
      <style>{`
        @keyframes iconPulse {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
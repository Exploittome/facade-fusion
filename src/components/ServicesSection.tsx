import { useEffect, useState, useRef } from "react";
import { Layers, Paintbrush, Thermometer } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "External Wall Insulation",
    description: "Comprehensive EWI systems that dramatically improve thermal performance and reduce energy costs for residential and commercial buildings.",
  },
  {
    icon: Paintbrush,
    title: "Silicone Render",
    description: "Premium render finishes that protect and beautify your building's exterior with long-lasting durability and exceptional quality.",
  },
  {
    icon: Thermometer,
    title: "Thermal Upgrades",
    description: "Expert thermal retrofitting solutions to bring older buildings up to modern energy standards and improve comfort.",
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
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-sm border border-border bg-card cursor-pointer transition-all duration-700 ease-out ${
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
              {/* Animated background glow on reveal */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent transition-opacity duration-1000 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${500 + index * 200}ms` }}
              />

              {/* Card Content - Always visible */}
              <div className="relative z-10 p-10 h-64 flex flex-col items-center justify-center text-center transition-all duration-500">
                <div 
                  className={`mb-6 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  } ${isVisible ? 'animate-none' : ''}`}
                  style={{
                    animation: isVisible ? `iconPulse 0.6s ease-out ${600 + index * 200}ms both` : 'none'
                  }}
                >
                  <service.icon 
                    size={48} 
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 
                  className={`text-xl font-medium text-foreground transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              {/* Hover Overlay with Description */}
              <div 
                className={`absolute inset-0 z-20 flex items-center justify-center p-8 bg-accent transition-all duration-500 ease-out ${
                  hoveredIndex === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full pointer-events-none'
                }`}
              >
                <div className="text-center">
                  <service.icon 
                    size={36} 
                    className="text-background mx-auto mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-medium text-background mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-background/85 leading-relaxed max-w-xs mx-auto">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line animation */}
              <div 
                className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-700 ease-out ${
                  isVisible ? 'w-full' : 'w-0'
                }`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
              />
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
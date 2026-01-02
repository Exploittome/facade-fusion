import { useEffect, useState } from "react";
import { Layers, Paintbrush, Thermometer } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "External Wall Insulation",
    description: "Comprehensive EWI systems that dramatically improve thermal performance and reduce energy costs for residential and commercial buildings.",
  },
  {
    icon: Paintbrush,
    title: "Facade Rendering",
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('.service-card');
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.service-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert solutions for all your facade and insulation needs
          </p>
        </div>

        {/* Services Grid - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card reveal-on-scroll stagger-${index + 1} group relative overflow-hidden rounded-sm border border-border bg-card cursor-pointer`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Content - Always visible */}
              <div className="relative z-10 p-10 h-64 flex flex-col items-center justify-center text-center transition-all duration-500">
                <div className={`mb-6 transition-all duration-500 ${hoveredIndex === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
                  <service.icon 
                    size={48} 
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className={`text-xl font-medium text-foreground transition-all duration-500 ${hoveredIndex === index ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

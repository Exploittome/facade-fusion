import { useEffect } from "react";
import { Layers, Paintbrush, Grid3X3, Thermometer, Zap } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "External Wall Insulation",
    description: "Comprehensive EWI systems that dramatically improve thermal performance and reduce energy costs.",
  },
  {
    icon: Paintbrush,
    title: "Facade Rendering",
    description: "Premium render finishes that protect and beautify your building's exterior for decades.",
  },
  {
    icon: Grid3X3,
    title: "Cladding Systems",
    description: "Modern cladding solutions combining aesthetic appeal with exceptional durability.",
  },
  {
    icon: Thermometer,
    title: "Thermal Upgrades",
    description: "Expert thermal retrofitting to bring older buildings up to modern energy standards.",
  },
  {
    icon: Zap,
    title: "Energy Efficiency Solutions",
    description: "Holistic approaches to minimize energy consumption and maximize building performance.",
  },
];

export function ServicesSection() {
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card reveal-on-scroll stagger-${index + 1} group p-8 bg-card rounded-sm border border-border hover:border-accent transition-all duration-500`}
              data-reveal-id={`service-${index}`}
            >
              <div className="mb-6">
                <service.icon 
                  size={32} 
                  className="text-accent group-hover:text-foreground transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

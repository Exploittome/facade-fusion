import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  {
    title: "Residential Complex",
    category: "External Insulation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    title: "Office Building",
    category: "Facade Renovation",
    image: "https://images.unsplash.com/photo-1545324418-cc6a8b6347c2?w=600&h=400&fit=crop",
  },
  {
    title: "Commercial Center",
    category: "Thermal Insulation",
    image: "https://images.unsplash.com/photo-1464938050520-ef2571923d20?w=600&h=400&fit=crop",
  },
  {
    title: "Private Villa",
    category: "Complete Facade",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".portfolio-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background overflow-hidden relative"
    >
      {/* Subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(35 70% 50% / 0.04) 0%, transparent 60%)'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 inline-block text-sm uppercase tracking-[0.2em] text-primary/80 mb-4">
            Our Work
          </span>
          <h2 className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Portfolio
          </h2>
          <p className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 delay-200 text-muted-foreground max-w-2xl mx-auto">
            Explore our completed projects showcasing excellence in facade insulation and renovation
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <Card
              key={item.title}
              className={`portfolio-reveal opacity-0 translate-y-8 transition-all duration-700 group cursor-pointer overflow-hidden border-0 bg-secondary/50 hover:bg-secondary`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs uppercase tracking-wider text-primary/70">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-reveal.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

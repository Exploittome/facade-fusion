import { useEffect, useRef, useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioItems = [
  {
    title: "Victorian Terraced House",
    category: "Silicone Render",
    image: portfolio1,
  },
  {
    title: "Semi-Detached Family Home",
    category: "External Insulation",
    image: portfolio2,
  },
  {
    title: "Modern Detached House",
    category: "Complete Facade",
    image: portfolio3,
  },
  {
    title: "Traditional Cottage",
    category: "Thermal Insulation",
    image: portfolio4,
  },
  {
    title: "Liverpool Townhouses",
    category: "Facade Renovation",
    image: portfolio5,
  },
  {
    title: "Georgian Manor",
    category: "Premium Render",
    image: portfolio6,
  },
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: true,
  });

  // Auto-scroll with interval
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = () => {
      if (!isHovered && emblaApi) {
        emblaApi.scrollNext();
      }
    };

    const interval = setInterval(autoScroll, 3000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 inline-block text-sm uppercase tracking-[0.2em] text-primary/80 mb-4">
              Our Work
            </span>
            <h2 className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 md:mb-0">
              Portfolio
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="portfolio-reveal opacity-0 translate-y-4 transition-all duration-700 delay-200 flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all duration-300 flex items-center justify-center group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Carousel */}
      <div 
        className="portfolio-reveal opacity-0 translate-y-8 transition-all duration-700 delay-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pl-6 lg:pl-12">
            {portfolioItems.map((item) => (
              <div 
                key={item.title} 
                className="flex-none w-[300px] md:w-[350px] lg:w-[400px]"
              >
                <Card className="group cursor-pointer overflow-hidden border-0 bg-secondary/50 hover:bg-secondary transition-colors duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Subtle dark overlay */}
                      <div className="absolute inset-0 bg-background/15 pointer-events-none" />
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
              </div>
            ))}
          </div>
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

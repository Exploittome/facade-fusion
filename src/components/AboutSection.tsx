import { useEffect } from "react";
import aboutImage from "@/assets/about-facade.jpg";

export function AboutSection() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('.about-reveal');
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
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const elements = document.querySelectorAll('.about-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="about-reveal reveal-on-scroll" data-reveal-id="about-text">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Building Excellence,
              <br />
              One Facade at a Time
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over two decades of experience in the construction industry, 
                we have established ourselves as leaders in facade solutions and 
                external wall insulation systems.
              </p>
              <p>
                Our commitment to craftsmanship means every project receives 
                meticulous attention to detail. We work exclusively with premium 
                materials from trusted manufacturers, ensuring durability that 
                stands the test of time.
              </p>
              <p>
                Energy efficiency is at the heart of what we do. Our insulation 
                systems not only reduce heating costs but contribute to a more 
                sustainable future, helping buildings achieve exceptional thermal 
                performance ratings.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <div className="text-2xl font-semibold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="about-reveal reveal-on-scroll stagger-2" data-reveal-id="about-image">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Modern facade construction"
                className="w-full h-auto rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

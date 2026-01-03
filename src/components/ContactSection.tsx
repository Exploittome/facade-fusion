import { useState, useEffect } from "react";
import { Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('.contact-reveal');
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

    const elements = document.querySelectorAll('.contact-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", phone: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary overflow-hidden relative">
      {/* Warm amber gradient from hero colors */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(30 75% 50% / 0.07) 0%, transparent 55%), radial-gradient(ellipse at bottom left, hsl(20 65% 40% / 0.05) 0%, transparent 50%)'
        }}
      />
      
      {/* Decorative diagonal lines background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                hsl(var(--foreground)) 0,
                hsl(var(--foreground)) 1px,
                transparent 1px,
                transparent 80px
              )
            `
          }}
        />
      </div>
      
      {/* Radial gradient spotlight */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(35 70% 55% / 0.06) 0%, transparent 70%)'
        }}
      />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 contact-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Ready to transform your building? Let's discuss your project.
            </p>
          </div>

          {/* Contact Form */}
          <form 
            onSubmit={handleSubmit} 
            className="contact-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="contact-reveal opacity-0 translate-x-[-20px] transition-all duration-500 delay-300 [&.revealed]:opacity-100 [&.revealed]:translate-x-0">
                <label htmlFor="fullName" className="block text-sm text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="John Smith"
                />
              </div>
              <div className="contact-reveal opacity-0 translate-x-[20px] transition-all duration-500 delay-300 [&.revealed]:opacity-100 [&.revealed]:translate-x-0">
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-400 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
              <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="+44 123 456 7890"
              />
            </div>

            <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-500 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="contact-reveal opacity-0 scale-95 transition-all duration-500 delay-600 [&.revealed]:opacity-100 [&.revealed]:scale-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="contact-reveal opacity-0 translate-y-8 transition-all duration-700 delay-700 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 mt-16 pt-12 border-t border-border">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-[800ms] [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="text-foreground">FTRENDERING2311@GMAIL.COM</div>
              </div>
              <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-[900ms] [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                <div className="text-sm text-muted-foreground mb-1">Phone</div>
                <div className="text-foreground">07 886 146 544</div>
                <div className="text-foreground">07 526 748 831</div>
              </div>
              <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-[1000ms] [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="text-foreground">Liverpool, United Kingdom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

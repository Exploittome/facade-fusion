import { useState, useEffect } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { ContactSidePanel } from "./ContactSidePanel";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

          {/* Minimalist Contact Form */}
          <form 
            onSubmit={handleSubmit} 
            className="contact-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-300 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="John Smith"
                />
              </div>
              <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-400 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-500 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="+44 123 456 7890"
              />
            </div>

            <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-600 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="contact-reveal opacity-0 translate-y-4 transition-all duration-500 delay-700 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-3 px-0 py-2 bg-transparent text-foreground font-medium transition-all duration-300 disabled:opacity-50"
              >
                <span className="relative">
                  {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
                {!isSubmitting && !submitted && (
                  <Send size={16} className="text-accent group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </button>
            </div>
          </form>

          {/* Contact Info - Click to open side panel */}
          <div className="contact-reveal opacity-0 translate-y-8 transition-all duration-700 delay-700 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 mt-16 pt-12 border-t border-border">
            <div className="flex justify-center items-center gap-5 md:gap-8">
              {/* Email */}
              <button
                onClick={() => setIsPanelOpen(true)}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-background border-2 border-foreground/80 flex items-center justify-center cursor-pointer hover:bg-muted hover:scale-105 transition-all duration-300 group"
                aria-label="Open contact info"
              >
                <Mail className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
              </button>

              {/* Phone */}
              <button
                onClick={() => setIsPanelOpen(true)}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-background border-2 border-foreground/80 flex items-center justify-center cursor-pointer hover:bg-muted hover:scale-105 transition-all duration-300 group"
                aria-label="Open contact info"
              >
                <Phone className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
              </button>

              {/* Location */}
              <button
                onClick={() => setIsPanelOpen(true)}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-background border-2 border-foreground/80 flex items-center justify-center cursor-pointer hover:bg-muted hover:scale-105 transition-all duration-300 group"
                aria-label="Open contact info"
              >
                <MapPin className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <ContactSidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </section>
  );
}

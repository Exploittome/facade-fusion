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
    <section id="contact" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 contact-reveal reveal-on-scroll" data-reveal-id="contact-header">
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
            className="contact-reveal reveal-on-scroll stagger-1 space-y-6"
            data-reveal-id="contact-form"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
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
              <div>
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

            <div>
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

            <div>
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
          </form>

          {/* Contact Info */}
          <div className="contact-reveal reveal-on-scroll stagger-2 mt-16 pt-12 border-t border-border" data-reveal-id="contact-info">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="text-foreground">info@facadepro.com</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Phone</div>
                <div className="text-foreground">+44 (0) 123 456 7890</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="text-foreground">London, United Kingdom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

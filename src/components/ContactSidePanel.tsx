import { X, Mail, Phone, MapPin } from "lucide-react";
interface ContactSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ContactSidePanel({
  isOpen,
  onClose
}: ContactSidePanelProps) {
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      
      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-card border-l border-border shadow-2xl z-50 transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors duration-200" aria-label="Close panel">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-8 pt-16 h-full overflow-y-auto">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Contact Us
          </h3>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors duration-200">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:ftrendering2311@gmail.com" className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-medium">
                  ftrendering2311@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors duration-200">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</div>
                <a href="tel:07886146544" className="text-foreground hover:text-accent transition-colors duration-200 block text-sm font-medium">
                  +44 7886 146 544
                </a>
                <a href="tel:07526748831" className="text-foreground hover:text-accent transition-colors duration-200 block text-sm font-medium mt-1">
                  +44 7526 748 831
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors duration-200">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                <div className="text-foreground text-sm font-medium">
                  Liverpool, United Kingdom
                </div>
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              We're here to help with your project
            </p>
          </div>
        </div>
      </div>
    </>;
}
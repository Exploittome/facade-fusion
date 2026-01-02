export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} FTRENDERING. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

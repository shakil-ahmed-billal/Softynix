import { MapPin, Mail, Phone } from "lucide-react";

const categories = ["Laptop & Desktop", "Gaming Console", "Software & Apps", "AI Solutions"];
const links = ["Track Order", "Privacy Policy", "Terms of Service", "Refund Policy", "Contact Support"];

const MobileFooter = () => {
  return (
    <footer className="container mx-auto px-4 py-8 bg-secondary/30 border-t border-border/50 safe-bottom">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">S</span>
        </div>
        <div>
          <h4 className="text-base font-bold text-foreground">Softynix</h4>
          <p className="text-xs text-muted-foreground">আপনার বিশ্বস্ত ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Categories */}
        <div>
          <h5 className="text-sm font-semibold text-foreground mb-3">Categories</h5>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li key={i}>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Useful Links */}
        <div>
          <h5 className="text-sm font-semibold text-foreground mb-3">Useful Links</h5>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Contact */}
      <div className="space-y-2 mb-6 pb-6 ">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          123 Main Street, Dhaka
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="w-4 h-4 text-primary" />
          support@softynix.com
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="w-4 h-4 text-primary" />
          +880 1234 567890
        </div>
      </div>
      
      <img src="/payment.webp" alt="payment" className="w-full h-full object-cover" />

      {/* Copyright */}
      <p className="text-xs text-muted-foreground text-center pt-6 pb-10">
        © 2023 Softynix. All rights reserved.
      </p>
    </footer>
  );
};

export default MobileFooter;

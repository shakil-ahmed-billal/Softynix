import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ChevronRight, Sparkles, Shield, Award } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const categories = [
    { name: "Laptop & Desktop", href: "/categories/laptop" },
    { name: "Gaming Console", href: "/categories/gaming" },
    { name: "Software & Apps", href: "/categories/software" },
    { name: "AI Solutions", href: "/categories/ai" },
  ];

  const usefulLinks = [
    { name: "Track Order", href: "/track", icon: ChevronRight },
    { name: "Privacy Policy", href: "/privacy", icon: ChevronRight },
    { name: "Terms of Service", href: "/terms", icon: ChevronRight },
    { name: "Refund Policy", href: "/refund", icon: ChevronRight },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", gradient: "from-blue-600 to-blue-700", label: "Facebook" },
    { icon: Twitter, href: "#", gradient: "from-sky-500 to-blue-600", label: "Twitter" },
    { icon: Instagram, href: "#", gradient: "from-pink-500 via-purple-500 to-orange-500", label: "Instagram" },
    { icon: Youtube, href: "#", gradient: "from-red-600 to-red-700", label: "YouTube" },
  ];

  const trustBadges = [
    { icon: Shield, text: "নিরাপদ পেমেন্ট" },
    { icon: Award, text: "বিশ্বস্ত সেবা" },
    { icon: Sparkles, text: "সেরা মূল্য" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Trust Badges - Mobile First */}
        {/* <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8 animate-fade-in">
          {trustBadges.map((badge, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="p-2 md:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-foreground text-center">
                {badge.text}
              </span>
            </div>
          ))}
        </div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          
          {/* About Softynix */}
          <div className="animate-slide-up">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-lg md:text-xl font-black text-white drop-shadow-lg">
                  S
                </span>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Softynix
              </span>
            </Link>

            <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
              আপনার বিশ্বস্ত ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস। 
              <span className="text-foreground font-semibold"> সেরা মূল্যে অরিজিনাল প্রোডাক্ট।</span>
            </p>

            {/* Social Links */}
            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="group relative"
                  aria-label={social.label}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg`} />
                  <div className={`relative p-2 md:p-2.5 rounded-lg bg-gradient-to-br ${social.gradient} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                    <social.icon className="h-4 w-4 md:h-4.5 md:w-4.5 text-white" strokeWidth={2} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-1 h-5 md:h-6 bg-gradient-primary rounded-full" />
              ক্যাটাগরি
            </h3>
            <ul className="space-y-2 md:space-y-2.5">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-1 h-5 md:h-6 bg-gradient-primary rounded-full" />
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2 md:space-y-2.5">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Support */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-1 h-5 md:h-6 bg-gradient-primary rounded-full" />
              যোগাযোগ করুন
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              <li className="flex items-start gap-2.5 md:gap-3 group">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" strokeWidth={2.5} />
                </div>
                <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  123 Main Street, Dhaka
                </span>
              </li>
              <li className="flex items-center gap-2.5 md:gap-3 group">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" strokeWidth={2.5} />
                </div>
                <a href="mailto:softynix.bd@gmail.com" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
                  softynix.bd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 md:gap-3 group">
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" strokeWidth={2.5} />
                </div>
                <a href="tel:+8801315608844" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
                  +880 1315-608844
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="rounded-xl bg-white backdrop-blur-sm border border-border/50">
            
            <img 
              src="/payment.webp" 
              alt="Payment Methods" 
              className="w-full h-auto object-contain max-w-2xl opacity-80 hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} <span className="font-semibold text-foreground">Softynix</span>. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-2 md:gap-3">
              <Badge 
                variant="outline" 
                className="px-2 md:px-3 py-1 border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-semibold rounded-lg"
              >
                <Shield className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                সুরক্ষিত
              </Badge>
              <Badge 
                variant="outline" 
                className="px-2 md:px-3 py-1 border-accent/30 bg-accent/5 text-accent text-[10px] md:text-xs font-semibold rounded-lg"
              >
                <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                বিশ্বস্ত
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
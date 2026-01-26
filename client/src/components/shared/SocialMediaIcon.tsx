import Image from "next/image";
import Link from "next/link";

export function SocialMediaIcon() {
  const socialMedia = [
    {
      name: "facebook",
      url: "",
      icon: "/social/facebook.png",
    },
    {
      name: "Whatsapp",
      url: "",
      icon: "/social/whatsapp.png",
    },
    {
      name: "Messenger",
      url: "",
      icon: "/social/messenger.png",
    },
  ];

  return (
    <div className="fixed bottom-[70%] right-3 sm:bottom-[50%] sm:right-4 lg:bottom-[50%] lg:right-6 z-40 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-1 sm:gap-2">
        {socialMedia.map((item, index) => (
          <Link 
            key={item.name} 
            href={item.url}
            className="group relative"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInFromRight 0.4s ease-out forwards'
            }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
            
            {/* Icon Container */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden shadow-lg hover:shadow-xl group-hover:scale-110 group-active:scale-95 transition-all duration-300 bg-background border-2 border-border/50 group-hover:border-primary/50">
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Image */}
              <div className="relative w-full h-full p-2 sm:p-2.5 lg:p-3">
                <Image 
                  src={item?.icon} 
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 bg-primary/10 scale-0 rounded-full group-active:scale-100 transition-transform duration-300" />
            </div>
            
            {/* Tooltip - Desktop Only */}
            <div className="hidden lg:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.name}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
            </div>
            
            {/* Pulse Ring for Active States */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500" />
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
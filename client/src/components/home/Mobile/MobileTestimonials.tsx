import { Star, Quote } from "lucide-react";

const testimonial = {
  text: "Cupidatat cupiditate unde quia magnam quis libero pariatur Aperiam dicta illum rerum ipsum pariatur Laborum Ut vel mollitia",
  author: "Shakil Ahmed Billal",
  product: "LastPass Premium - Password Manager",
  rating: 5,
};

const MobileTestimonials = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-2">গ্রাহকদের মতামত</h2>
      <p className="text-sm text-muted-foreground mb-4">
        আমাদের গ্রাহকদের কাছ থেকে আসা মূল্যবান মতামত
      </p>
      
      <div className="bg-gradient-card border border-border/50 rounded-xl p-5 relative overflow-hidden">
        {/* Decorative quote */}
        <Quote className="absolute top-3 right-3 w-12 h-12 text-primary/10" />
        
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        
        {/* Text */}
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">
          "{testimonial.text}"
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">SA</span>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{testimonial.author}</div>
            <div className="text-xs text-muted-foreground">{testimonial.product}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileTestimonials;

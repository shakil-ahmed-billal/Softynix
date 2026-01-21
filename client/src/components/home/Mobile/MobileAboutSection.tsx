const MobileAboutSection = () => {
    return (
      <section className="px-4 py-6">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-5">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Softynix সম্পর্কে</h3>
              <p className="text-xs text-muted-foreground">আপনার বিশ্বস্ত ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Softynix হল বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস। আমরা অরিজিনাল সাবস্ক্রিপশন, সফটওয়্যার লাইসেন্স এবং ডিজিটাল টুলস সেরা মূল্যে সরবরাহ করি।
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            আমাদের লক্ষ্য হল গ্রাহকদের কাছে মানসম্মত ডিজিটাল প্রোডাক্ট সহজে এবং নিরাপদে পৌঁছে দেওয়া। ইনস্ট্যান্ট ডেলিভারি, নিরাপদ পেমেন্ট এবং ২৪/৭ সাপোর্টের মাধ্যমে আমরা আপনার বিশ্বাস অর্জন করতে প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>
      </section>
    );
  };
  
  export default MobileAboutSection;
  
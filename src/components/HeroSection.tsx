import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Arabic Calligraphy Style */}
          <p className="text-secondary text-lg md:text-xl font-serif mb-4 animate-pulse-soft">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Yayasan
            <span className="block text-gradient mt-2">Baet El Anshar</span>
          </h1>

          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Membangun generasi Qur'ani yang berilmu, berakhlak mulia, 
            dan bermanfaat bagi umat melalui pendidikan Islam yang berkualitas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
            {[
              { number: "4", label: "Lembaga Pendidikan" },
              { number: "500+", label: "Santri & Siswa" },
              { number: "50+", label: "Tenaga Pengajar" },
              { number: "9", label: "Tahun Berdiri" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-primary-foreground/10 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-secondary font-serif">
                  {stat.number}
                </div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button
  variant="gold"
  size="xl"
  onClick={() => {
    const el = document.getElementById("lembaga");
    el && el.scrollIntoView({ behavior: "smooth" });
  }}
>
  Jelajahi Lembaga Kami
</Button>

<Button
  variant="outline-light"
  size="xl"
  onClick={() => {
    const el = document.getElementById("kontak");
    el && el.scrollIntoView({ behavior: "smooth" });
  }}
>
  Hubungi Kami
</Button>
</div>
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

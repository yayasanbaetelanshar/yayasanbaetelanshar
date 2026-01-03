import { Link } from "react-router-dom";
import { GraduationCap, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mosque.jpg";
import logoyayasan from "@/assets/logo yayasan.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-8">
  <img 
    src={logoyayasan}
    alt="Logo Yayasan Baet El Anshar" 
    className="h-24 md:h-32 w-auto animate-fade-in" 
  />
</div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-sm font-medium">
              Pendaftaran Tahun Ajaran 2025/2026 Dibuka
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Yayasan Pendidikan Islam{" "}
            <span className="gold-accent">Baet El Anshar</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Membentuk generasi Qurani yang berakhlak mulia, berwawasan luas, dan 
            siap menjadi pemimpin umat. Menaungi DTA, SMP, SMA, dan Pondok Pesantren 
            Tahfidz Quran.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/pendaftaran">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <GraduationCap className="w-5 h-5 mr-2" />
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/galeri">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg px-8 py-6 rounded-xl">
                <PlayCircle className="w-5 h-5 mr-2" />
                Lihat Galeri
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-secondary">1000+</p>
              <p className="text-primary-foreground/80 text-sm">Santri Aktif</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-secondary">4</p>
              <p className="text-primary-foreground/80 text-sm">Lembaga Pendidikan</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-secondary">15+</p>
              <p className="text-primary-foreground/80 text-sm">Tahun Pengalaman</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-secondary">500+</p>
              <p className="text-primary-foreground/80 text-sm">Hafidz Quran</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

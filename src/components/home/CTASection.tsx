import { Link } from "react-router-dom";
import { GraduationCap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Islamic Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-20" />
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Wujudkan Impian Menjadi{" "}
            <span className="gold-accent">Hafidz Quran</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Bergabunglah bersama ribuan santri yang telah menghafal Al-Quran dan meraih 
            prestasi di Yayasan Baet El Anshar.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pendaftaran">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-lg px-10 py-6 rounded-xl shadow-lg">
                <GraduationCap className="w-5 h-5 mr-2" />
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/kontak">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg px-10 py-6 rounded-xl">
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Arabic Quote */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/20">
            <p className="font-serif text-2xl text-primary-foreground/90 mb-2" dir="rtl">
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
            <p className="text-primary-foreground/70 text-sm">
              "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya" (HR. Bukhari)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

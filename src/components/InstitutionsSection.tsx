import { ArrowRight, GraduationCap, BookOpen, Building, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DtaLogo from "@/assets/Logo yayasan.png";
import SmpLogo from "@/assets/logo SMP.png";
import SmaLogo from "@/assets/logo SMA.png";
import PesantrenLogo from "@/assets/Logo yayasan.png";


const institutions = [
  {
    id: 1,
    slug: "dta",
    name: "DTA Arrasyd",
    subtitle: "Diniyah Takmiliyah Awaliyah",
    description: "Pendidikan agama Islam dasar untuk anak-anak dengan kurikulum yang menyenangkan dan mudah dipahami.",
    logo: DtaLogo,
    color: "from-emerald-500 to-emerald-600",
    features: ["Baca Tulis Al-Qur'an", "Akidah & Akhlak", "Fiqih Dasar", "Bahasa Arab"],
  },
  {
    id: 2,
    slug: "smp",
    name: "SMP Baet El Anshar",
    subtitle: "Sekolah Menengah Pertama",
    description: "Jenjang pendidikan menengah pertama dengan kurikulum nasional dan penguatan pendidikan Islam.",
    logo: SmpLogo,
    color: "from-blue-500 to-blue-600",
    features: ["Kurikulum Merdeka", "Tahfidz Program", "Ekstrakurikuler", "Bimbingan Belajar"],
  },
  {
    id: 3,
    slug: "sma",
    name: "SMA Baet El Anshar",
    subtitle: "Sekolah Menengah Atas",
    description: "Pendidikan menengah atas yang mempersiapkan siswa untuk melanjutkan ke perguruan tinggi.",
    logo: SmaLogo,
    color: "from-gray-500 to-gray-600",
    features: ["Program IPA & IPS", "Persiapan UTBK", "Tahfidz Lanjutan", "Leadership Program"],
  },
  {
    id: 4,
    slug: "pesantren",
    name: "Pondok Pesantren Tahfidz Quran",
    subtitle: "Baet El Anshar",
    description: "Program intensif menghafal Al-Qur'an dengan bimbingan hafidz berpengalaman dalam lingkungan Islami.",
    logo: PesantrenLogo,
    color: "from-primary to-emerald-700",
    features: ["30 Juz Program", "Metode Talaqqi", "Asrama 24 Jam", "Pembinaan Akhlak"],
  },
];

const InstitutionsSection = () => {
  return (
    <section id="lembaga" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-secondary font-serif text-lg mb-2 block">Lembaga Pendidikan</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Unit Pendidikan Kami
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Yayasan Baet El Anshar menaungi empat lembaga pendidikan yang saling terintegrasi 
            untuk memberikan pendidikan Islam yang komprehensif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {institutions.map((institution, index) => (
            <div
              key={institution.id}
              className="group card-hover bg-card rounded-2xl overflow-hidden border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${institution.color} p-6 text-primary-foreground`}>
                <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
  <img
    src={institution.logo}
    alt={`Logo ${institution.name}`}
    className="w-10 h-10 object-contain"
  />
</div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold">{institution.name}</h3>
                    <p className="text-primary-foreground/80 text-sm">{institution.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {institution.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {institution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to={`/lembaga/${institution.slug}`}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionsSection;

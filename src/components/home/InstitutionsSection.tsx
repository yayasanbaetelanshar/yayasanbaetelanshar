import { Link } from "react-router-dom";
<<<<<<< HEAD
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import logo & hero image (pastikan path sesuai dengan struktur folder assets kamu)
import dtaHero from "@/assets/logo dta.png";
import smpHero from "@/assets/logo smp.png";
import smaHero from "@/assets/logo sma.png";
import pesantrenHero from "@/assets/logo ponpes.png";
import majlisHero from "@/assets/logo ponpes.png";
import koperasiHero from "@/assets/logo ponpes.png";

import dtaLogo from "@/assets/logo dta.png";
import smpLogo from "@/assets/logo smp.png";
import smaLogo from "@/assets/logo sma.png";
import pesantrenLogo from "@/assets/logo ponpes.png";
import majlisLogo from "@/assets/logo yayasan.png";
import koperasiLogo from "@/assets/logo ponpes.png";

=======
import { ArrowRight, BookOpen, GraduationCap, School, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
const institutions = [
  {
    id: "dta",
    name: "DTA Arrasyd",
    description: "Pendidikan agama Islam tingkat dasar dengan fokus pada pembentukan karakter Islami dan Al-Quran.",
<<<<<<< HEAD
    logo: dtaLogo,
    heroImage: dtaHero,
    level: "Tingkat Dasar",
    color: "bg-emerald-100 text-emerald-700",
=======
    icon: BookOpen,
    level: "Tingkat Dasar",
    color: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-500",
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
  },
  {
    id: "smp",
    name: "SMP Baet El Anshar",
    description: "Menggabungkan kurikulum nasional dengan kurikulum pesantren untuk pendidikan menengah pertama.",
<<<<<<< HEAD
    logo: smpLogo,
    heroImage: smpHero,
    level: "Tingkat Menengah Pertama",
    color: "bg-amber-100 text-amber-700",
=======
    icon: School,
    level: "Tingkat Menengah Pertama",
    color: "bg-gold-100 text-gold-600",
    iconBg: "bg-gold-500",
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
  },
  {
    id: "sma",
    name: "SMA Baet El Anshar",
    description: "Mempersiapkan santri untuk perguruan tinggi dengan bekal ilmu agama dan hafalan Al-Quran.",
<<<<<<< HEAD
    logo: smaLogo,
    heroImage: smaHero,
    level: "Tingkat Menengah Atas",
    color: "bg-emerald-100 text-emerald-700",
=======
    icon: GraduationCap,
    level: "Tingkat Menengah Atas",
    color: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-600",
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
  },
  {
    id: "pesantren",
    name: "Pesantren Tahfidz Quran",
    description: "Program intensif penghafalan Al-Quran 30 juz dengan metode talaqqi dan bimbingan personal.",
<<<<<<< HEAD
    logo: pesantrenLogo,
    heroImage: pesantrenHero,
    level: "Program Tahfidz",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "majlis-taklim",
    name: "Majlis Ta'lim",
    description: "Program pembinaan masyarakat sekitar yayasan untuk meningkatkan pemahaman agama.",
    logo: majlisLogo,
    heroImage: majlisHero,
    level: "Semua Usia",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "koperasi",
    name: "Koperasi Serba Usaha Riung Mukti",
    description: "Program pembinaan usaha masyarakat sekitar yayasan untuk kesejahteraan ekonomi.",
    logo: koperasiLogo,
    heroImage: koperasiHero,
    level: "Semua Usia",
    color: "bg-amber-100 text-amber-700",
=======
    icon: BookMarked,
    level: "Program Tahfidz",
    color: "bg-gold-100 text-gold-600",
    iconBg: "bg-gold-500",
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
  },
];

export default function InstitutionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
<<<<<<< HEAD
            Lembaga & Program
          </span>
          <h2 className="section-heading">
            Lembaga dan Program <span className="text-primary">Baet El Anshar</span>
          </h2>
          <p className="section-subheading mt-4">
            Dari pendidikan formal hingga pembinaan masyarakat, kami hadir untuk membangun generasi dan komunitas yang lebih baik.
=======
            Lembaga Pendidikan
          </span>
          <h2 className="section-heading">
            Empat Pilar Pendidikan <span className="text-primary">Baet El Anshar</span>
          </h2>
          <p className="section-subheading mt-4">
            Pilih jenjang pendidikan yang sesuai untuk putra-putri Anda, dari tingkat dasar 
            hingga program tahfidz intensif.
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
          </p>
        </div>

        {/* Institution Cards */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
=======
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
          {institutions.map((inst, index) => (
            <Link
              key={inst.id}
              to={`/lembaga/${inst.id}`}
<<<<<<< HEAD
              className="group block h-full"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 border border-border flex flex-col h-full">
                {/* Hero Image / Logo Utama */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-white p-6">
                  <img
                    src={inst.heroImage}
                    alt={`Logo ${inst.name}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Logo kecil sebagai pengganti icon */}
                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={inst.logo}
                        alt={`Logo kecil ${inst.name}`}
                        className="w-12 h-12 object-contain p-1"
                      />
                    </div>

                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${inst.color} mb-2`}
                      >
                        {inst.level}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {inst.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {inst.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all mt-auto">
                    Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </span>
=======
              className="group"
            >
              <div
                className="bg-card rounded-2xl p-8 shadow-card card-hover border border-border h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${inst.iconBg} flex items-center justify-center shrink-0`}>
                    <inst.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${inst.color} mb-3`}>
                      {inst.level}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {inst.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {inst.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
<<<<<<< HEAD
        <div className="text-center mt-16">
          <Link to="/pendaftaran">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-7 text-lg"
            >
              <GraduationCap className="w-6 h-6 mr-3" />
              Daftarkan Putra-Putri Anda Sekarang
=======
        <div className="text-center mt-12">
          <Link to="/pendaftaran">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
              <GraduationCap className="w-5 h-5 mr-2" />
              Daftarkan Putra-Putri Anda
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711

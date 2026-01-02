import { BookOpen, Heart, Star, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Kurikulum Terpadu",
    description: "Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif.",
  },
  {
    icon: Heart,
    title: "Akhlakul Karimah",
    description: "Menanamkan nilai-nilai akhlak mulia dan kepribadian Islami sejak dini.",
  },
  {
    icon: Star,
    title: "Tahfidz Al-Qur'an",
    description: "Program hafalan Al-Qur'an dengan metode yang mudah dan menyenangkan.",
  },
  {
    icon: Users,
    title: "Pengajar Berkualitas",
    description: "Dibimbing oleh ustadz dan ustadzah yang berpengalaman dan bersertifikasi.",
  },
];

const AboutSection = () => {
  return (
    <section id="tentang" className="py-20 md:py-32 bg-background geometric-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-secondary font-serif text-lg mb-2 block">Tentang Kami</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mencetak Generasi Qur'ani
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Yayasan Baet El Anshar didirikan dengan visi mulia untuk membentuk 
            generasi muslim yang hafal Al-Qur'an, berilmu, berakhlak mulia, 
            dan siap menjadi pemimpin umat di masa depan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover bg-card p-6 rounded-xl border border-border group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
            <h3 className="font-serif text-2xl font-bold mb-4">Visi</h3>
            <p className="text-primary-foreground/90 leading-relaxed text-lg">
              Menjadi lembaga pendidikan Islam terdepan yang melahirkan 
              generasi Qur'ani, berakhlak mulia, dan berkompetensi tinggi 
              untuk kemajuan agama, bangsa, dan negara.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Misi</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                Menyelenggarakan pendidikan Islam yang berkualitas dan terjangkau
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                Mengembangkan program tahfidz Al-Qur'an yang sistematis
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                Membentuk karakter Islami melalui pendidikan akhlak
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                Mempersiapkan peserta didik untuk masa depan yang lebih baik
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

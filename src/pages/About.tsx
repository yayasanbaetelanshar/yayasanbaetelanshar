import Layout from "@/components/layout/Layout";
import AboutSection from "@/components/home/AboutSection";
import { BookOpen, Users, Award, Heart, Star } from "lucide-react";

const milestones = [
  { year: "2008", event: "Pendirian Yayasan Baet El Anshar" },
  { year: "2009", event: "Pembukaan DTA Arrasyd" },
  { year: "2012", event: "Pembukaan SMP Baet El Anshar" },
  { year: "2015", event: "Pembukaan SMA Baet El Anshar" },
  { year: "2018", event: "Pembukaan Pondok Pesantren Tahfidz Quran" },
  { year: "2023", event: "Meluluskan 500+ Hafidz Al-Quran" },
];

const achievements = [
  { icon: Star, value: "50+", label: "Juara Kompetisi Nasional" },
  { icon: BookOpen, value: "500+", label: "Hafidz Al-Quran" },
  { icon: Users, value: "1000+", label: "Santri Aktif" },
  { icon: Award, value: "95%", label: "Lulusan Diterima PTN" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Tentang Yayasan
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Yayasan Baet El Anshar didirikan dengan visi membentuk generasi Qurani yang 
            berakhlak mulia, berwawasan luas, dan siap menjadi pemimpin umat.
          </p>
        </div>
      </section>

      {/* About Content */}
      <AboutSection />

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Perjalanan Kami
            </span>
            <h2 className="section-heading">
              Sejarah <span className="text-primary">Baet El Anshar</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}>
                    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                      <span className="text-secondary font-bold text-lg">{milestone.year}</span>
                      <p className="text-foreground mt-1">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Prestasi Kami
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Alhamdulillah, dengan rahmat Allah SWT, Yayasan Baet El Anshar telah mencapai berbagai prestasi.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {achievements.map((item) => (
              <div
                key={item.label}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              >
                <item.icon className="w-10 h-10 text-secondary mx-auto mb-4" />
                <p className="font-serif text-4xl font-bold text-primary-foreground mb-2">
                  {item.value}
                </p>
                <p className="text-primary-foreground/80 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Pengurus Yayasan
            </span>
            <h2 className="section-heading">
              Dipimpin oleh Para <span className="text-primary">Ulama</span>
            </h2>
            <p className="section-subheading mt-4">
              Yayasan dipimpin oleh para ustadz dan ulama yang berpengalaman dalam bidang pendidikan Islam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "KH. Ahmad Fauzi", role: "Ketua Yayasan", image: "👳‍♂️" },
              { name: "Ust. Muhammad Ali", role: "Direktur Pendidikan", image: "👨‍🏫" },
              { name: "Ust. Ibrahim Hasan", role: "Kepala Tahfidz", image: "📖" },
            ].map((person) => (
              <div
                key={person.name}
                className="bg-card rounded-2xl p-8 text-center shadow-card border border-border"
              >
                <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 text-4xl">
                  {person.image}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{person.name}</h3>
                <p className="text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BookOpen, Building, GraduationCap, Moon, Users, Clock, MapPin, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const institutionsData = {
  dta: {
    name: "DTA Arrasyd",
    fullName: "Diniyah Takmiliyah Awaliyah Arrasyd",
    subtitle: "Pendidikan Agama Islam Dasar",
    description: "DTA Arrasyd adalah lembaga pendidikan agama Islam dasar yang memberikan fondasi keislaman yang kuat bagi anak-anak. Dengan metode pembelajaran yang menyenangkan, kami memastikan setiap anak dapat belajar Al-Qur'an, akidah, akhlak, dan fiqih dengan baik.",
    icon: BookOpen,
    color: "from-emerald-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    curriculum: [
      "Baca Tulis Al-Qur'an (BTQ)",
      "Tajwid dan Tahsin",
      "Akidah Akhlak",
      "Fiqih Ibadah Dasar",
      "Bahasa Arab Dasar",
      "Sejarah Islam (Sirah Nabawiyah)",
      "Doa dan Dzikir Harian",
      "Hafalan Surat-surat Pendek"
    ],
    facilities: [
      "Ruang Kelas Ber-AC",
      "Musholla",
      "Perpustakaan Islami",
      "Area Bermain",
      "Kantin Sehat",
      "Toilet Bersih"
    ],
    schedule: "Senin - Sabtu, 14:00 - 17:00 WIB",
    age: "6 - 12 Tahun",
    fees: {
      registration: "Rp 250.000",
      monthly: "Rp 150.000",
      uniform: "Rp 200.000",
      books: "Rp 100.000"
    }
  },
  smp: {
    name: "SMP Baet El Anshar",
    fullName: "Sekolah Menengah Pertama Baet El Anshar",
    subtitle: "Pendidikan Menengah Pertama Islam",
    description: "SMP Baet El Anshar memberikan pendidikan menengah pertama dengan kurikulum nasional yang diperkaya dengan nilai-nilai Islam. Siswa tidak hanya unggul dalam akademik, tetapi juga memiliki karakter Islami yang kuat.",
    icon: Building,
    color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200",
    curriculum: [
      "Kurikulum Merdeka",
      "Matematika & Sains",
      "Bahasa Indonesia & Inggris",
      "IPS Terpadu",
      "Pendidikan Agama Islam Plus",
      "Tahfidz Al-Qur'an (Target 5 Juz)",
      "Bahasa Arab Intensif",
      "Ekstrakurikuler Islami"
    ],
    facilities: [
      "Laboratorium IPA",
      "Laboratorium Komputer",
      "Perpustakaan",
      "Masjid",
      "Lapangan Olahraga",
      "Kantin",
      "UKS",
      "Ruang Multimedia"
    ],
    schedule: "Senin - Jumat, 07:00 - 15:00 WIB",
    age: "12 - 15 Tahun (Kelas 7-9)",
    fees: {
      registration: "Rp 2.500.000",
      monthly: "Rp 750.000",
      uniform: "Rp 500.000",
      books: "Rp 800.000"
    }
  },
  sma: {
    name: "SMA Baet El Anshar",
    fullName: "Sekolah Menengah Atas Baet El Anshar",
    subtitle: "Pendidikan Menengah Atas Islam",
    description: "SMA Baet El Anshar mempersiapkan siswa untuk melanjutkan ke perguruan tinggi terbaik dengan tetap memegang teguh nilai-nilai Islam. Program kami fokus pada pengembangan akademik, karakter, dan kepemimpinan.",
    icon: GraduationCap,
    color: "from-amber-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
    curriculum: [
      "Kurikulum Merdeka",
      "Program IPA & IPS",
      "Persiapan UTBK/SBMPTN",
      "Tahfidz Al-Qur'an (Target 10 Juz)",
      "Bahasa Arab & Inggris Aktif",
      "Leadership Program",
      "Riset & Karya Ilmiah",
      "Bimbingan Karir & Kuliah"
    ],
    facilities: [
      "Laboratorium IPA Lengkap",
      "Laboratorium Bahasa",
      "Laboratorium Komputer",
      "Perpustakaan Digital",
      "Masjid",
      "Lapangan Olahraga",
      "Aula Serbaguna",
      "Ruang BK"
    ],
    schedule: "Senin - Jumat, 07:00 - 16:00 WIB",
    age: "15 - 18 Tahun (Kelas 10-12)",
    fees: {
      registration: "Rp 3.000.000",
      monthly: "Rp 900.000",
      uniform: "Rp 600.000",
      books: "Rp 1.000.000"
    }
  },
  pesantren: {
    name: "Pondok Pesantren Tahfidz Quran",
    fullName: "Pondok Pesantren Tahfidz Quran Baet El Anshar",
    subtitle: "Program Intensif Menghafal Al-Qur'an",
    description: "Pondok Pesantren Tahfidz Quran Baet El Anshar adalah program intensif untuk menghafal Al-Qur'an 30 Juz dengan metode talaqqi langsung dari para hafidz berpengalaman. Santri tinggal di asrama dengan pembinaan 24 jam.",
    icon: Moon,
    color: "from-primary to-emerald-700",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200",
    curriculum: [
      "Hafalan 30 Juz Al-Qur'an",
      "Metode Talaqqi & Tasmi'",
      "Ilmu Tajwid Mendalam",
      "Tafsir Al-Qur'an",
      "Hadits & Ulumul Hadits",
      "Fiqih Lengkap",
      "Bahasa Arab Fusha",
      "Pembinaan Akhlak 24 Jam"
    ],
    facilities: [
      "Asrama Putra & Putri Terpisah",
      "Masjid Besar",
      "Ruang Tahfidz",
      "Perpustakaan Islam",
      "Dapur & Ruang Makan",
      "Lapangan Olahraga",
      "Klinik Kesehatan",
      "Taman & Area Hijau"
    ],
    schedule: "Program Mukim 24 Jam, 7 Hari Seminggu",
    age: "12 - 25 Tahun",
    fees: {
      registration: "Rp 1.500.000",
      monthly: "Rp 1.200.000 (Termasuk Makan & Asrama)",
      uniform: "Rp 400.000",
      books: "Rp 300.000"
    }
  }
};

const InstitutionDetail = () => {
  const { slug } = useParams();
  const institution = institutionsData[slug as keyof typeof institutionsData];

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lembaga tidak ditemukan</h1>
          <Link to="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = institution.icon;

  return (
    <>
      <Helmet>
        <title>{institution.name} - Yayasan Baet El Anshar</title>
        <meta name="description" content={institution.description} />
      </Helmet>

      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${institution.image})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${institution.color} opacity-90`} />
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-primary-foreground max-w-2xl animate-fade-in">
              <Link
                to="/#lembaga"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
              >
                <ArrowLeft size={20} />
                Kembali
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
                    {institution.name}
                  </h1>
                  <p className="text-primary-foreground/80">{institution.subtitle}</p>
                </div>
              </div>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                {institution.description}
              </p>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-4 -mt-16 relative z-20">
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Usia</span>
                </div>
                <p className="text-muted-foreground">{institution.age}</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Jadwal</span>
                </div>
                <p className="text-muted-foreground">{institution.schedule}</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Lokasi</span>
                </div>
                <p className="text-muted-foreground">Komplek Yayasan Baet El Anshar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum & Facilities */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Curriculum */}
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Kurikulum</h2>
                <ul className="space-y-3">
                  {institution.curriculum.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Facilities */}
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Fasilitas</h2>
                <ul className="space-y-3">
                  {institution.facilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <DollarSign className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Biaya Pendaftaran
                </h2>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Biaya Pendaftaran</span>
                    <span className="font-semibold text-foreground">{institution.fees.registration}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">SPP Bulanan</span>
                    <span className="font-semibold text-foreground">{institution.fees.monthly}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Seragam</span>
                    <span className="font-semibold text-foreground">{institution.fees.uniform}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Buku & Perlengkapan</span>
                    <span className="font-semibold text-foreground">{institution.fees.books}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  * Biaya dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru.
                </p>
              </div>
              <div className="text-center mt-8">
                <Link to="/pendaftaran">
                  <Button variant="gold" size="xl">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default InstitutionDetail;

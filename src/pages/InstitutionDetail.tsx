import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import DtaLogo from "@/assets/logo DTA.png";
import SmpLogo from "@/assets/logo SMP.png";
import SmaLogo from "@/assets/logo SMA.png";
import PesantrenLogo from "@/assets/logo pondok.png";

const institutionsData = {
  dta: {
    name: "DTA Arrasyd",
    subtitle: "Pendidikan Agama Islam Dasar",
    description:
      "DTA Arrasyd adalah lembaga pendidikan agama Islam dasar dengan pendekatan menyenangkan dan Islami.",
    logo: DtaLogo,
    color: "from-emerald-500 to-emerald-600",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    age: "6 – 12 Tahun",
    schedule: "Senin – Sabtu, 14:00 – 16:00 WIB",
    curriculum: ["BTQ", "Akidah Akhlak", "Fiqih Dasar", "Bahasa Arab"],
    facilities: ["Ruang Kelas", "Musholla", "Area Bermain"],
    fees: {
      registration: "Rp 250.000",
      monthly: "Rp 150.000",
      uniform: "Rp 200.000",
      books: "Rp 100.000",
    },
  },

  smp: {
    name: "SMP Baet El Anshar",
    subtitle: "Sekolah Menengah Pertama Islam",
    description:
      "SMP Baet El Anshar menggabungkan kurikulum nasional dan penguatan karakter Islami.",
    logo: SmpLogo,
    color: "from-blue-500 to-blue-600",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200",
    age: "12 – 15 Tahun",
    schedule: "Senin – Sabtu, 07:00 – 13:00 WIB",
    curriculum: ["Kurikulum Merdeka", "Tahfidz", "Bahasa Arab"],
    facilities: ["Lab IPA", "Perpustakaan", "Masjid"],
    fees: {
      registration: "Rp 2.500.000",
      monthly: "Rp 750.000",
      uniform: "Rp 500.000",
      books: "Rp 800.000",
    },
  },

  sma: {
    name: "SMA Baet El Anshar",
    subtitle: "Sekolah Menengah Atas Islam",
    description:
      "SMA Baet El Anshar mempersiapkan siswa menuju perguruan tinggi dengan karakter Islami dan kepemimpinan.",
    logo: SmaLogo,
    color: "from-slate-500 to-slate-700", // ✅ ABU-ABU SMA
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
    age: "15 – 18 Tahun",
    schedule: "Senin – Sabtu, 07:00 – 14:00 WIB",
    curriculum: ["IPA & IPS", "UTBK", "Tahfidz"],
    facilities: ["Lab Lengkap", "Perpustakaan Digital", "Aula"],
    fees: {
      registration: "Rp 3.000.000",
      monthly: "Rp 900.000",
      uniform: "Rp 600.000",
      books: "Rp 1.000.000",
    },
  },

  pesantren: {
    name: "Pondok Pesantren Tahfidz",
    subtitle: "Program Hafalan 30 Juz",
    description:
      "Program mukim dengan pembinaan 24 jam dan metode talaqqi.",
    logo: PesantrenLogo, // ✅ FIX (bukan Logo)
    color: "from-emerald-700 to-emerald-900",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200",
    age: "12 – 25 Tahun",
    schedule: "Mukim 24 Jam",
    curriculum: ["Tahfidz", "Tajwid", "Tafsir"],
    facilities: ["Asrama", "Masjid", "Ruang Tahfidz"],
    fees: {
      registration: "Rp 1.500.000",
      monthly: "Rp 1.200.000",
      uniform: "Rp 400.000",
      books: "Rp 300.000",
    },
  },
};

export default function InstitutionDetail() {
  const { slug } = useParams();
  const institution = institutionsData[slug as keyof typeof institutionsData];

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lembaga tidak ditemukan</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{institution.name} – Baet El Anshar</title>
      </Helmet>

      <Navbar />

      <section className="relative h-[50vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${institution.image})` }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${institution.color} opacity-90`}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <Link
              to="/#lembaga"
              className="flex items-center gap-2 mb-4 opacity-80 hover:opacity-100"
            >
              <ArrowLeft size={18} /> Kembali
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <img
                  src={institution.logo}
                  alt={institution.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold">{institution.name}</h1>
                <p className="opacity-80">{institution.subtitle}</p>
              </div>
            </div>

            <p className="opacity-90">{institution.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Info icon={<Users />} label="Usia" value={institution.age} />
          <Info icon={<Clock />} label="Jadwal" value={institution.schedule} />
          <Info icon={<MapPin />} label="Lokasi" value="Komplek Yayasan" />
        </div>

        <div className="text-center">
          <Link to="/pendaftaran">
            <Button size="xl" variant="gold">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Info({ icon, label, value }: any) {
  return (
    <div className="bg-card p-6 rounded-xl border">
      <div className="flex items-center gap-3 mb-1 text-slate-600">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Clock, XCircle, FileSearch, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type RegistrationStatus = "pending" | "review" | "accepted" | "rejected";

interface RegistrationData {
  registration_number: string;
  student_name: string;
  institution: string;
  status: RegistrationStatus;
  created_at: string;
  notes?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Menunggu Verifikasi",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    description: "Pendaftaran Anda sedang dalam antrian untuk diverifikasi oleh tim kami.",
  },
  review: {
    icon: FileSearch,
    label: "Sedang Ditinjau",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Dokumen dan data Anda sedang ditinjau oleh tim seleksi.",
  },
  accepted: {
    icon: CheckCircle,
    label: "Diterima",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Selamat! Pendaftaran Anda telah diterima. Silakan lakukan daftar ulang.",
  },
  rejected: {
    icon: XCircle,
    label: "Ditolak",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    description: "Maaf, pendaftaran Anda tidak dapat kami terima saat ini.",
  },
};

const institutionNames = {
  dta: "DTA Arrasyd",
  smp: "SMP Baet El Anshar",
  sma: "SMA Baet El Anshar",
  pesantren: "Pondok Pesantren Tahfidz Quran",
};

const RegistrationStatus = () => {
  const [searchParams] = useSearchParams();
  const [regNumber, setRegNumber] = useState(searchParams.get("reg") || "");
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRegistration = async (number: string) => {
    if (!number) return;

    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("registrations")
        .select("registration_number, student_name, institution, status, created_at, notes")
        .eq("registration_number", number)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError("Nomor pendaftaran tidak ditemukan");
        setRegistration(null);
      } else {
        setRegistration(data as RegistrationData);
      }
    } catch (err: any) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (regNumber) {
      fetchRegistration(regNumber);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegistration(regNumber);
  };

  const status = registration ? statusConfig[registration.status] : null;
  const StatusIcon = status?.icon;

  return (
    <>
      <Helmet>
        <title>Cek Status Pendaftaran - Yayasan Baet El Anshar</title>
        <meta name="description" content="Cek status pendaftaran siswa baru di Yayasan Baet El Anshar" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-secondary font-serif text-lg mb-2 block">Tracking Pendaftaran</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cek Status Pendaftaran
              </h1>
              <p className="text-muted-foreground">
                Masukkan nomor pendaftaran untuk melihat status pendaftaran Anda.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-2">
                <Input
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="Masukkan nomor pendaftaran (REG-XXXXXXXX-XXXX)"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Mencari..." : "Cari"}
                </Button>
              </div>
            </form>

            {/* Error State */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
                <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-foreground font-medium">{error}</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Pastikan nomor pendaftaran yang Anda masukkan benar.
                </p>
              </div>
            )}

            {/* Result */}
            {registration && status && StatusIcon && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden animate-fade-in">
                {/* Status Header */}
                <div className={`${status.bgColor} p-6 text-center`}>
                  <StatusIcon className={`w-16 h-16 ${status.color} mx-auto mb-4`} />
                  <h2 className={`text-2xl font-bold ${status.color}`}>{status.label}</h2>
                  <p className="text-muted-foreground mt-2">{status.description}</p>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">No. Pendaftaran</span>
                    <span className="font-mono font-semibold text-foreground">
                      {registration.registration_number}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Nama Siswa</span>
                    <span className="font-semibold text-foreground">{registration.student_name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Lembaga</span>
                    <span className="font-semibold text-foreground">
                      {institutionNames[registration.institution as keyof typeof institutionNames]}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Tanggal Daftar</span>
                    <span className="text-foreground">
                      {new Date(registration.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {registration.notes && (
                    <div className="bg-muted p-4 rounded-lg mt-4">
                      <p className="text-sm font-medium text-foreground mb-1">Catatan:</p>
                      <p className="text-muted-foreground text-sm">{registration.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-border flex gap-4">
                  <Link to="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Home className="w-4 h-4" />
                      Beranda
                    </Button>
                  </Link>
                  {registration.status === "accepted" && (
                    <Link to="/auth" className="flex-1">
                      <Button variant="gold" className="w-full">
                        Buat Akun Wali
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* No search yet */}
            {!registration && !error && !loading && !regNumber && (
              <div className="bg-muted/50 rounded-xl p-8 text-center">
                <FileSearch className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Masukkan nomor pendaftaran untuk melihat status
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegistrationStatus;

// Dashboard.tsx - Portal Wali Santri Yayasan Baet El Anshar (Versi Sesuai DB Real)

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LogOut,
  User,
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Hourglass,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LogoBaetElAnshar from "@/assets/Logo yayasan.png";

const institutionNames: Record<"dta" | "smp" | "sma" | "pesantren", string> = {
  dta: "DTA Arrasyd",
  smp: "SMP Baet El Anshar",
  sma: "SMA Baet El Anshar",
  pesantren: "Pondok Pesantren Tahfidz",
};

const statusConfig = {
  pending: { icon: Hourglass, color: "text-amber-600", label: "Menunggu Pengajuan" },
  review: { icon: Clock, color: "text-blue-600", label: "Sedang Direview" },
  accepted: { icon: CheckCircle, color: "text-green-600", label: "Diterima" },
  rejected: { icon: AlertCircle, color: "text-red-600", label: "Ditolak" },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: prof } = await supabase
        .from("profiles")
        .select("full_name, phone, avatar_url")
        .eq("user_id", session.user.id)
        .single();
      setProfile(prof || { full_name: "Wali Santri" });

      // Fetch registrations milik user ini
      const { data: regs } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setRegistrations(regs || []);

      // Fetch students yang sudah resmi (parent_id = user_id)
      const { data: stds } = await supabase
        .from("students")
        .select("id, full_name, institution, grade, photo_url")
        .eq("parent_id", session.user.id);

      if (stds && stds.length > 0) {
        setStudents(stds);
        setSelectedStudent(stds[0].id);
      }

      setLoading(false);
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (selectedStudent) {
      const fetchProgress = async () => {
        const { data } = await supabase
          .from("student_progress")
          .select("*")
          .eq("student_id", selectedStudent)
          .order("created_at", { ascending: false });
        setProgress(data || []);
      };
      fetchProgress();
    }
  }, [selectedStudent]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Berhasil Keluar", description: "Sampai jumpa lagi!" });
    navigate("/");
  };

  const currentStudent = students.find((s) => s.id === selectedStudent);
  const hafalanProgress = progress.filter((p) => p.type === "hafalan");
  const academicProgress = progress.filter((p) => p.type === "academic");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portal Wali Santri - Yayasan Baet El Anshar</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={LogoBaetElAnshar}
                  alt="Logo Yayasan"
                  className="h-9 w-auto object-contain"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-logo.png")}
                />
                <div className="hidden sm:block">
                  <span className="font-serif text-lg font-bold text-foreground">Portal Wali Santri</span>
                  <p className="text-xs text-muted-foreground">Yayasan Baet El Anshar</p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {profile?.full_name || "Wali Santri"}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Jika ada santri resmi (sudah di-accept dan masuk tabel students) */}
          {students.length > 0 ? (
            <>
              {/* Selector santri */}
              {students.length > 1 && (
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">Pilih Santri</label>
                  <div className="flex flex-wrap gap-3">
                    {students.map((s) => (
                      <Button
                        key={s.id}
                        variant={selectedStudent === s.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedStudent(s.id)}
                      >
                        {s.full_name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Info santri & progress (sama seperti sebelumnya) */}
              {currentStudent && (
                <>
                  <div className="bg-card rounded-xl border p-6 mb-8 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                        {currentStudent.photo_url ? (
                          <img src={currentStudent.photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold">{currentStudent.full_name}</h2>
                        <p className="text-muted-foreground">
                          {institutionNames[currentStudent.institution]}
                          {currentStudent.grade && ` • Kelas ${currentStudent.grade}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress cards - sama seperti kode lama kamu */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Hafalan & Akademik - copy dari kode lama */}
                    {/* ... (sama persis seperti sebelumnya) */}
                  </div>
                </>
              )}
            </>
          ) : (
            /* Jika belum ada di tabel students → tampilkan status dari registrations */
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-center mb-8">
                Status Pendaftaran Santri
              </h2>

              {registrations.length === 0 ? (
                <div className="bg-card rounded-xl border p-10 text-center">
                  <Users className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Belum Ada Pendaftaran</h3>
                  <p className="text-muted-foreground mb-6">
                    Silakan lakukan pendaftaran santri terlebih dahulu.
                  </p>
                  <Link to="/pendaftaran">
                    <Button>Daftar Santri Baru</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {registrations.map((reg) => {
                    const StatusIcon = statusConfig[reg.status].icon;
                    return (
                      <div key={reg.id} className="bg-card rounded-xl border p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-serif text-xl font-bold">{reg.student_name}</h3>
                            <p className="text-muted-foreground mt-1">
                              {institutionNames[reg.institution]}
                            </p>
                            <p className="text-sm text-muted-foreground mt-3">
                              Nomor Pendaftaran: <span className="font-medium">{reg.registration_number}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Tanggal Pengajuan: {new Date(reg.created_at).toLocaleDateString("id-ID")}
                            </p>
                          </div>

                          <div className={`flex items-center gap-3 ${statusConfig[reg.status].color}`}>
                            <StatusIcon className="w-8 h-8" />
                            <div className="text-right">
                              <p className="font-bold text-lg">{statusConfig[reg.status].label}</p>
                              {reg.notes && <p className="text-sm mt-1 max-w-xs">{reg.notes}</p>}
                            </div>
                          </div>
                        </div>

                        {reg.status === "accepted" && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-green-800 font-medium">
                              Selamat! Pendaftaran telah diterima. Data santri akan segera muncul di dashboard setelah admin memproses.
                            </p>
                          </div>
                        )}

                        {reg.status === "rejected" && reg.notes && (
                          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-red-800">{reg.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
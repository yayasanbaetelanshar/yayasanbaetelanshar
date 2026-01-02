import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LogOut, User, BookOpen, GraduationCap, Clock, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
}

interface Student {
  id: string;
  full_name: string;
  institution: string;
  grade: string | null;
  photo_url: string | null;
}

interface Progress {
  id: string;
  type: string;
  subject: string;
  score: number | null;
  notes: string | null;
  semester: string | null;
  academic_year: string | null;
  created_at: string;
}

const institutionNames = {
  dta: "DTA Arrasyd",
  smp: "SMP Baet El Anshar",
  sma: "SMA Baet El Anshar",
  pesantren: "Pondok Pesantren Tahfidz",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, phone, avatar_url")
        .eq("user_id", session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch students
      const { data: studentsData } = await supabase
        .from("students")
        .select("id, full_name, institution, grade, photo_url")
        .eq("parent_id", session.user.id);

      if (studentsData && studentsData.length > 0) {
        setStudents(studentsData);
        setSelectedStudent(studentsData[0].id);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        }
      }
    );

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

        if (data) {
          setProgress(data);
        }
      };

      fetchProgress();
    }
  }, [selectedStudent]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Berhasil Keluar",
      description: "Sampai jumpa lagi!",
    });
    navigate("/");
  };

  const hafalanProgress = progress.filter((p) => p.type === "hafalan");
  const academicProgress = progress.filter((p) => p.type === "academic");

  const currentStudent = students.find((s) => s.id === selectedStudent);

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
        <title>Dashboard Wali Santri - Yayasan Baet El Anshar</title>
        <meta name="description" content="Dashboard wali santri untuk memantau perkembangan anak" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold">ب</span>
                </div>
                <span className="font-serif text-lg font-bold hidden sm:block">Portal Wali Santri</span>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm hidden sm:block">{profile?.full_name}</span>
                </div>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Keluar</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {students.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Belum Ada Data Santri
              </h2>
              <p className="text-muted-foreground mb-6">
                Data santri Anda akan muncul di sini setelah pendaftaran disetujui dan data ditambahkan oleh admin.
              </p>
              <Link to="/pendaftaran/status">
                <Button variant="outline">Cek Status Pendaftaran</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Student Selector */}
              {students.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pilih Santri
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {students.map((student) => (
                      <Button
                        key={student.id}
                        variant={selectedStudent === student.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedStudent(student.id)}
                      >
                        {student.full_name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Info */}
              {currentStudent && (
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {currentStudent.photo_url ? (
                        <img
                          src={currentStudent.photo_url}
                          alt={currentStudent.full_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-bold text-foreground">
                        {currentStudent.full_name}
                      </h2>
                      <p className="text-muted-foreground">
                        {institutionNames[currentStudent.institution as keyof typeof institutionNames]}
                        {currentStudent.grade && ` • ${currentStudent.grade}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hafalan Progress */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="bg-primary p-4 text-primary-foreground">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6" />
                      <h3 className="font-serif text-lg font-bold">Progress Hafalan</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {hafalanProgress.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada data hafalan</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {hafalanProgress.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(item.created_at).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            {item.score && (
                              <div className="flex items-center gap-1 text-primary">
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-semibold">{item.score}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Progress */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="bg-secondary p-4">
                    <div className="flex items-center gap-3 text-secondary-foreground">
                      <GraduationCap className="w-6 h-6" />
                      <h3 className="font-serif text-lg font-bold">Nilai Akademik</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {academicProgress.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada data nilai</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {academicProgress.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.semester} - {item.academic_year}
                              </p>
                            </div>
                            {item.score && (
                              <div className={`font-bold ${item.score >= 75 ? "text-primary" : "text-amber-500"}`}>
                                {item.score}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {progress.length === 0 && (
                <div className="mt-6 bg-muted/50 rounded-xl p-6 text-center">
                  <p className="text-muted-foreground">
                    Data progress hafalan dan nilai akademik akan ditampilkan di sini setelah diinput oleh pengajar.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;

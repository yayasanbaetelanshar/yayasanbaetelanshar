import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Users, 
  FileText, 
  ImageIcon, 
  LogOut,
  GraduationCap,
  ClipboardList,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LogoBaetElAnshar from "@/assets/Logo yayasan.png"

interface DashboardStats {
  totalRegistrations: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  totalStudents: number;
  totalGalleryItems: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    totalStudents: 0,
    totalGalleryItems: 0,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: hasRole } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin"
      });

      if (!hasRole) {
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses admin",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchStats();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [registrations, students, gallery] = await Promise.all([
        supabase.from("registrations").select("status"),
        supabase.from("students").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
      ]);

      const regData = registrations.data || [];
      
      setStats({
        totalRegistrations: regData.length,
        pendingRegistrations: regData.filter(r => r.status === "pending").length,
        approvedRegistrations: regData.filter(r => r.status === "accepted").length,
        totalStudents: students.count || 0,
        totalGalleryItems: gallery.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const menuItems = [
    { 
      label: "Pendaftaran", 
      icon: ClipboardList, 
      href: "/admin/registrations",
      count: stats.pendingRegistrations,
      description: "Kelola pendaftaran siswa baru"
    },
    { 
      label: "Siswa", 
      icon: GraduationCap, 
      href: "/admin/students",
      count: stats.totalStudents,
      description: "Kelola data siswa"
    },
    { 
      label: "Galeri", 
      icon: ImageIcon, 
      href: "/admin/gallery",
      count: stats.totalGalleryItems,
      description: "Kelola foto dan video"
    },
    { 
      label: "User & Role", 
      icon: Shield, 
      href: "/admin/users",
      count: 0,
      description: "Kelola user dan assign role admin"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Yayasan Baet El Anshar</title>
      </Helmet>

      <div className="min-h-screen bg-background">
       {/* Header dengan Logo */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Nama */}
              <div className="flex items-center gap-3">
                <img
                  src={LogoBaetElAnshar}
                  alt="Logo Yayasan Baet El Anshar"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <span className="font-serif text-lg font-bold text-foreground">Admin Panel</span>
                  <p className="text-xs text-muted-foreground">Yayasan Baet El Anshar</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              Selamat Datang, Admin
            </h1>
            <p className="text-muted-foreground">
              Kelola website dan portal wali santri Yayasan Baet El Anshar
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRegistrations}</p>
                  <p className="text-xs text-muted-foreground">Total Pendaftaran</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingRegistrations}</p>
                  <p className="text-xs text-muted-foreground">Menunggu Review</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Total Siswa</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalGalleryItems}</p>
                  <p className="text-xs text-muted-foreground">Item Galeri</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  {item.count > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;

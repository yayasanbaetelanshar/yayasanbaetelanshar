import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Chrome } from "lucide-react"; // <-- Tambah Chrome untuk ikon Google
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

const authSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  full_name: z.string().min(3, "Nama minimal 3 karakter").optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // <-- State baru untuk loading Google
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  useEffect(() => {
    const checkRoleAndRedirect = async (userId: string) => {
      const { data: hasAdminRole } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });

      if (hasAdminRole) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setTimeout(() => {
            checkRoleAndRedirect(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkRoleAndRedirect(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        toast({
          title: "Berhasil Masuk",
          description: "Selamat datang kembali!",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: data.full_name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Pendaftaran Berhasil",
          description: "Akun Anda telah dibuat. Silakan masuk.",
        });
        setIsLogin(true);
        reset();
      }
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes("User already registered")) {
        message = "Email sudah terdaftar. Silakan masuk atau gunakan email lain.";
      } else if (error.message.includes("Invalid login credentials")) {
        message = "Email atau password salah.";
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Login/Daftar dengan Google
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // Kembali ke app setelah login
          queryParams: {
            prompt: "consent", // Memastikan user diminta pilih akun
          },
        },
      });

      if (error) throw error;

      // Redirect akan ditangani oleh Supabase → kembali ke app → onAuthStateChange akan jalankan redirect berdasarkan role
    } catch (error: any) {
      toast({
        title: "Gagal Login dengan Google",
        description: error.message || "Terjadi kesalahan saat mencoba login dengan Google.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Masuk" : "Daftar"} - Portal Wali Santri | Yayasan Baet El Anshar</title>
        <meta name="description" content="Portal wali santri untuk memantau perkembangan hafalan dan nilai akademik anak" />
      </Helmet>

      <div className="min-h-screen flex">
        {/* Left Side - Image */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 p-12 flex flex-col justify-center">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="text-primary-foreground font-serif text-xl font-bold">ب</span>
                </div>
                <span className="font-serif text-2xl font-bold text-primary-foreground">Baet El Anshar</span>
              </div>
              <h1 className="font-serif text-4xl font-bold text-primary-foreground mb-4">
                Portal Wali Santri
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Pantau perkembangan hafalan Al-Qur'an dan nilai akademik anak Anda secara real-time melalui portal wali santri.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Lihat progress hafalan Al-Qur'an</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Pantau nilai akademik setiap semester</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Terima notifikasi perkembangan anak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-serif text-lg font-bold">ب</span>
                </div>
                <span className="font-serif text-xl font-bold text-foreground">Baet El Anshar</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                {isLogin ? "Selamat Datang" : "Buat Akun"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Masuk ke portal wali santri"
                  : "Daftar untuk mengakses portal wali santri"}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {!isLogin && (
                <div>
                  <Label htmlFor="full_name">Nama Lengkap</Label>
                  <Input
                    id="full_name"
                    {...register("full_name")}
                    placeholder="Nama lengkap Anda"
                    className="mt-1"
                  />
                  {errors.full_name && (
                    <p className="text-destructive text-sm mt-1">{errors.full_name.message}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@contoh.com"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Minimal 6 karakter"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isLogin ? "Masuk..." : "Mendaftar..."}
                  </>
                ) : isLogin ? (
                  "Masuk"
                ) : (
                  "Daftar"
                )}
              </Button>
            </form>

            {/* Divider "atau" */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">atau</span>
              </div>
            </div>

            {/* Tombol Login dengan Google */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Chrome className="mr-2 h-5 w-5" />
              )}
              {isLogin ? "Masuk" : "Daftar"} dengan Google
            </Button>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="text-primary hover:underline"
              >
                {isLogin
                  ? "Belum punya akun? Daftar sekarang"
                  : "Sudah punya akun? Masuk"}
              </button>
            </div>

            <div className="mt-8 text-center">
              <a href="/" className="text-muted-foreground hover:text-foreground text-sm">
                ← Kembali ke Beranda
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
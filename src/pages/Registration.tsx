import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const registrationSchema = z.object({
  parent_name: z.string().min(3, "Nama harus minimal 3 karakter"),
  parent_phone: z.string().min(10, "Nomor telepon tidak valid"),
  parent_email: z.string().email("Email tidak valid"),
  parent_address: z.string().min(10, "Alamat harus lengkap"),
  parent_occupation: z.string().optional(),
  student_name: z.string().min(3, "Nama harus minimal 3 karakter"),
  student_birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
  student_birth_place: z.string().min(2, "Tempat lahir wajib diisi"),
  student_gender: z.enum(["male", "female"], { required_error: "Pilih jenis kelamin" }),
  institution: z.enum(["dta", "smp", "sma", "pesantren"], { required_error: "Pilih lembaga" }),
  previous_school: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<{
    birth_certificate?: File;
    family_card?: File;
    photo?: File;
    report_card?: File;
    payment_proof?: File;
  }>({});
  const [paymentProofError, setPaymentProofError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const handleFileChange = (field: keyof typeof documents, file: File | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }
      setDocuments((prev) => ({ ...prev, [field]: file }));
    }
  };

  const uploadDocument = async (file: File, path: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${path}-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("registration-documents")
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  };

  const onSubmit = async (data: RegistrationFormData) => {
    // Validate payment proof is required
    if (!documents.payment_proof) {
      setPaymentProofError(true);
      toast({
        title: "Bukti Pembayaran Wajib",
        description: "Mohon upload bukti pembayaran pendaftaran",
        variant: "destructive",
      });
      return;
    }
    setPaymentProofError(false);
    setIsSubmitting(true);

    try {
      // Upload documents
      const documentUrls: Record<string, string> = {};

      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          setUploadProgress((prev) => ({ ...prev, [key]: true }));
          const path = await uploadDocument(file, `${data.student_name.replace(/\s/g, "-")}-${key}`);
          documentUrls[`${key}_url`] = path;
          setUploadProgress((prev) => ({ ...prev, [key]: false }));
        }
      }

      // Submit registration
      const insertData = {
        parent_name: data.parent_name,
        parent_phone: data.parent_phone,
        parent_email: data.parent_email,
        parent_address: data.parent_address,
        parent_occupation: data.parent_occupation || null,
        student_name: data.student_name,
        student_birth_date: data.student_birth_date,
        student_birth_place: data.student_birth_place,
        student_gender: data.student_gender,
        institution: data.institution,
        previous_school: data.previous_school || null,
        birth_certificate_url: documentUrls.birth_certificate_url || null,
        family_card_url: documentUrls.family_card_url || null,
        photo_url: documentUrls.photo_url || null,
        report_card_url: documentUrls.report_card_url || null,
        payment_proof_url: documentUrls.payment_proof_url || null,
      };

      const { data: registration, error } = await supabase
        .from("registrations")
        .insert(insertData as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Pendaftaran Berhasil!",
        description: `Nomor pendaftaran Anda: ${registration.registration_number}`,
      });

      navigate(`/pendaftaran/status?reg=${registration.registration_number}`);
    } catch (error: any) {
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const institution = watch("institution");

  return (
    <>
      <Helmet>
        <title>Pendaftaran Online - Yayasan Baet El Anshar</title>
        <meta name="description" content="Daftar online untuk menjadi siswa di Yayasan Baet El Anshar" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-secondary font-serif text-lg mb-2 block">Pendaftaran Siswa Baru</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Formulir Pendaftaran Online
              </h1>
              <p className="text-muted-foreground">
                Silakan isi formulir di bawah ini dengan lengkap dan benar.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Institution Selection */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Pilih Lembaga
                </h2>
                <Select onValueChange={(value) => setValue("institution", value as any)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih lembaga pendidikan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dta">DTA Arrasyd</SelectItem>
                    <SelectItem value="smp">SMP Baet El Anshar</SelectItem>
                    <SelectItem value="sma">SMA Baet El Anshar</SelectItem>
                    <SelectItem value="pesantren">Pondok Pesantren Tahfidz Quran</SelectItem>
                  </SelectContent>
                </Select>
                {errors.institution && (
                  <p className="text-destructive text-sm mt-1">{errors.institution.message}</p>
                )}
              </div>

              {/* Parent Information */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Data Orang Tua / Wali
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parent_name">Nama Lengkap *</Label>
                    <Input
                      id="parent_name"
                      {...register("parent_name")}
                      placeholder="Nama lengkap orang tua/wali"
                    />
                    {errors.parent_name && (
                      <p className="text-destructive text-sm mt-1">{errors.parent_name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="parent_phone">No. Telepon *</Label>
                    <Input
                      id="parent_phone"
                      {...register("parent_phone")}
                      placeholder="08xx xxxx xxxx"
                    />
                    {errors.parent_phone && (
                      <p className="text-destructive text-sm mt-1">{errors.parent_phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="parent_email">Email *</Label>
                    <Input
                      id="parent_email"
                      type="email"
                      {...register("parent_email")}
                      placeholder="email@contoh.com"
                    />
                    {errors.parent_email && (
                      <p className="text-destructive text-sm mt-1">{errors.parent_email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="parent_occupation">Pekerjaan</Label>
                    <Input
                      id="parent_occupation"
                      {...register("parent_occupation")}
                      placeholder="Pekerjaan orang tua/wali"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="parent_address">Alamat Lengkap *</Label>
                    <Textarea
                      id="parent_address"
                      {...register("parent_address")}
                      placeholder="Alamat lengkap termasuk RT/RW, kelurahan, kecamatan"
                      rows={3}
                    />
                    {errors.parent_address && (
                      <p className="text-destructive text-sm mt-1">{errors.parent_address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Data Calon Siswa
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="student_name">Nama Lengkap *</Label>
                    <Input
                      id="student_name"
                      {...register("student_name")}
                      placeholder="Nama lengkap sesuai akta kelahiran"
                    />
                    {errors.student_name && (
                      <p className="text-destructive text-sm mt-1">{errors.student_name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="student_birth_place">Tempat Lahir *</Label>
                    <Input
                      id="student_birth_place"
                      {...register("student_birth_place")}
                      placeholder="Kota/kabupaten kelahiran"
                    />
                    {errors.student_birth_place && (
                      <p className="text-destructive text-sm mt-1">{errors.student_birth_place.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="student_birth_date">Tanggal Lahir *</Label>
                    <Input
                      id="student_birth_date"
                      type="date"
                      {...register("student_birth_date")}
                    />
                    {errors.student_birth_date && (
                      <p className="text-destructive text-sm mt-1">{errors.student_birth_date.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Jenis Kelamin *</Label>
                    <RadioGroup
                      onValueChange={(value) => setValue("student_gender", value as "male" | "female")}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">Laki-laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">Perempuan</Label>
                      </div>
                    </RadioGroup>
                    {errors.student_gender && (
                      <p className="text-destructive text-sm mt-1">{errors.student_gender.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="previous_school">Asal Sekolah</Label>
                    <Input
                      id="previous_school"
                      {...register("previous_school")}
                      placeholder="Nama sekolah sebelumnya"
                    />
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Dokumen Persyaratan
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Upload dokumen dalam format JPG, PNG, atau PDF. Maksimal 5MB per file.
                </p>
                {/* Payment Proof - Required */}
                <div className={`border rounded-lg p-4 ${paymentProofError ? "border-destructive" : "border-border"}`}>
                  <Label className="mb-2 block">
                    Bukti Pembayaran Pendaftaran <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        handleFileChange("payment_proof", e.target.files?.[0]);
                        if (e.target.files?.[0]) setPaymentProofError(false);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`flex items-center gap-3 p-3 border-2 border-dashed rounded-lg hover:border-primary transition-colors ${paymentProofError ? "border-destructive" : "border-border"}`}>
                      {documents.payment_proof ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm text-foreground truncate">
                            {documents.payment_proof.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Upload bukti transfer...</span>
                        </>
                      )}
                    </div>
                  </div>
                  {paymentProofError && (
                    <p className="text-destructive text-sm mt-1">Bukti pembayaran wajib diupload</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload bukti transfer pembayaran biaya pendaftaran
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: "birth_certificate", label: "Akta Kelahiran" },
                    { key: "family_card", label: "Kartu Keluarga" },
                    { key: "photo", label: "Pas Foto 3x4" },
                    { key: "report_card", label: "Rapor Terakhir" },
                  ].map(({ key, label }) => (
                    <div key={key} className="border border-border rounded-lg p-4">
                      <Label className="mb-2 block">{label}</Label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(key as keyof typeof documents, e.target.files?.[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 p-3 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                          {documents[key as keyof typeof documents] ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-primary" />
                              <span className="text-sm text-foreground truncate">
                                {documents[key as keyof typeof documents]?.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Pilih file...</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pendaftaran"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Dengan mengirim formulir ini, Anda menyetujui syarat dan ketentuan yang berlaku.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Registration;

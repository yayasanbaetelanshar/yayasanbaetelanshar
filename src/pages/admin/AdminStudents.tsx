import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Plus, 
  Search,
  Edit,
  Trash2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Student = Tables<"students">;

const institutions = [
  { value: "dta", label: "DTA Arrasyd" },
  { value: "smp", label: "SMP Baet El Anshar" },
  { value: "sma", label: "SMA Baet El Anshar" },
  { value: "pesantren", label: "Pondok Pesantren" },
];

const AdminStudents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    nis: "",
    birth_place: "",
    birth_date: "",
    gender: "male",
    institution: "",
    grade: "",
  });

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
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
        navigate("/");
        return;
      }

      await fetchStudents();
    } catch (error) {
      console.error("Error:", error);
      navigate("/auth");
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      full_name: student.full_name,
      nis: student.nis || "",
      birth_place: student.birth_place,
      birth_date: student.birth_date,
      gender: student.gender,
      institution: student.institution,
      grade: student.grade || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingStudent(null);
    setFormData({
      full_name: "",
      nis: "",
      birth_place: "",
      birth_date: "",
      gender: "male",
      institution: "",
      grade: "",
    });
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.birth_date || !formData.institution) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingStudent) {
        // Update
        const { error } = await supabase
          .from("students")
          .update({
            full_name: formData.full_name,
            nis: formData.nis || null,
            birth_place: formData.birth_place,
            birth_date: formData.birth_date,
            gender: formData.gender,
            institution: formData.institution,
            grade: formData.grade || null,
          } as any)
          .eq("id", editingStudent.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Data siswa berhasil diperbarui" });
      } else {
        // Insert
        const { error } = await supabase
          .from("students")
          .insert({
            full_name: formData.full_name,
            nis: formData.nis || null,
            birth_place: formData.birth_place,
            birth_date: formData.birth_date,
            gender: formData.gender,
            institution: formData.institution,
            grade: formData.grade || null,
          } as any);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Siswa berhasil ditambahkan" });
      }

      setDialogOpen(false);
      resetForm();
      await fetchStudents();
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data siswa ini?")) return;

    try {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) throw error;

      toast({ title: "Berhasil", description: "Data siswa berhasil dihapus" });
      await fetchStudents();
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredStudents = students.filter((s) =>
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Kelola Siswa - Admin</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <h1 className="font-serif text-lg font-bold text-foreground ml-4">
                  Kelola Siswa
                </h1>
              </div>
              <Dialog open={dialogOpen} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Siswa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingStudent ? "Edit Siswa" : "Tambah Siswa"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nama Lengkap *</Label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Nama lengkap siswa"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>NIS</Label>
                        <Input
                          value={formData.nis}
                          onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                          placeholder="Nomor Induk Siswa"
                        />
                      </div>
                      <div>
                        <Label>Kelas</Label>
                        <Input
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          placeholder="Contoh: 7A, X-IPA"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tempat Lahir *</Label>
                        <Input
                          value={formData.birth_place}
                          onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                          placeholder="Kota kelahiran"
                        />
                      </div>
                      <div>
                        <Label>Tanggal Lahir *</Label>
                        <Input
                          type="date"
                          value={formData.birth_date}
                          onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Jenis Kelamin *</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(v) => setFormData({ ...formData, gender: v })}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="m" />
                          <Label htmlFor="m">Laki-laki</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="f" />
                          <Label htmlFor="f">Perempuan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Lembaga *</Label>
                      <Select
                        value={formData.institution}
                        onValueChange={(v) => setFormData({ ...formData, institution: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lembaga" />
                        </SelectTrigger>
                        <SelectContent>
                          {institutions.map((inst) => (
                            <SelectItem key={inst.value} value={inst.value}>{inst.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSubmit} disabled={saving} className="w-full">
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        "Simpan"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau NIS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">NIS</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nama</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lembaga</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Kelas</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-4 text-sm font-mono">{student.nis || "-"}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{student.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.birth_place}, {new Date(student.birth_date).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">
                          {institutions.find(i => i.value === student.institution)?.label || student.institution}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{student.grade || "-"}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(student)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteStudent(student.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStudents.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  Tidak ada data siswa
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminStudents;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Eye, 
  Check, 
  X, 
  Download,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Registration = Tables<"registrations">;

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Menunggu", variant: "secondary" },
  review: { label: "Direview", variant: "outline" },
  accepted: { label: "Diterima", variant: "default" },
  rejected: { label: "Ditolak", variant: "destructive" },
};

const institutionLabels: Record<string, string> = {
  dta: "DTA Arrasyd",
  smp: "SMP Baet El Anshar",
  sma: "SMA Baet El Anshar",
  pesantren: "Pondok Pesantren",
};

const AdminRegistrations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

      await fetchRegistrations();
    } catch (error) {
      console.error("Error:", error);
      navigate("/auth");
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "accepted" | "rejected" | "review") => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status Diperbarui",
        description: `Pendaftaran berhasil ${status === "accepted" ? "diterima" : status === "rejected" ? "ditolak" : "direview"}`,
      });

      await fetchRegistrations();
      setSelectedRegistration(null);
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getDocumentUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from("registration-documents").getPublicUrl(path);
    return data.publicUrl;
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.registration_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
        <title>Kelola Pendaftaran - Admin</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <h1 className="font-serif text-lg font-bold text-foreground ml-4">
                Kelola Pendaftaran
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama siswa, orang tua, atau nomor pendaftaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="review">Direview</SelectItem>
                <SelectItem value="accepted">Diterima</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Registrations Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">No. Daftar</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nama Siswa</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lembaga</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tanggal</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-4 text-sm font-mono">{reg.registration_number}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{reg.student_name}</p>
                          <p className="text-xs text-muted-foreground">{reg.parent_name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{institutionLabels[reg.institution] || reg.institution}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(reg.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-4">
                        <Badge variant={statusLabels[reg.status]?.variant || "secondary"}>
                          {statusLabels[reg.status]?.label || reg.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRegistration(reg)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegistrations.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  Tidak ada data pendaftaran
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Detail Dialog */}
        <Dialog open={!!selectedRegistration} onOpenChange={() => setSelectedRegistration(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">Detail Pendaftaran</DialogTitle>
            </DialogHeader>
            {selectedRegistration && (
              <div className="space-y-6">
                {/* Registration Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">No. Pendaftaran</p>
                    <p className="font-mono font-medium">{selectedRegistration.registration_number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant={statusLabels[selectedRegistration.status]?.variant}>
                      {statusLabels[selectedRegistration.status]?.label}
                    </Badge>
                  </div>
                </div>

                {/* Student Info */}
                <div>
                  <h4 className="font-semibold mb-2">Data Siswa</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm bg-muted/30 p-4 rounded-lg">
                    <div>
                      <p className="text-muted-foreground">Nama Lengkap</p>
                      <p className="font-medium">{selectedRegistration.student_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Jenis Kelamin</p>
                      <p className="font-medium">{selectedRegistration.student_gender === "male" ? "Laki-laki" : "Perempuan"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tempat, Tanggal Lahir</p>
                      <p className="font-medium">
                        {selectedRegistration.student_birth_place}, {new Date(selectedRegistration.student_birth_date).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lembaga</p>
                      <p className="font-medium">{institutionLabels[selectedRegistration.institution]}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div>
                  <h4 className="font-semibold mb-2">Data Orang Tua</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm bg-muted/30 p-4 rounded-lg">
                    <div>
                      <p className="text-muted-foreground">Nama</p>
                      <p className="font-medium">{selectedRegistration.parent_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">No. Telepon</p>
                      <p className="font-medium">{selectedRegistration.parent_phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedRegistration.parent_email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pekerjaan</p>
                      <p className="font-medium">{selectedRegistration.parent_occupation || "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Alamat</p>
                      <p className="font-medium">{selectedRegistration.parent_address}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold mb-2">Dokumen</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "birth_certificate_url", label: "Akta Kelahiran" },
                      { key: "family_card_url", label: "Kartu Keluarga" },
                      { key: "photo_url", label: "Pas Foto" },
                      { key: "report_card_url", label: "Rapor" },
                      { key: "payment_proof_url", label: "Bukti Pembayaran" },
                    ].map(({ key, label }) => {
                      const url = getDocumentUrl((selectedRegistration as any)[key]);
                      return (
                        <a
                          key={key}
                          href={url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${
                            url 
                              ? "border-primary/30 bg-primary/5 hover:bg-primary/10 cursor-pointer" 
                              : "border-border bg-muted/30 cursor-not-allowed opacity-50"
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          {label}
                          {!url && <span className="text-xs">(tidak ada)</span>}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                {selectedRegistration.status === "pending" || selectedRegistration.status === "review" ? (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => updateStatus(selectedRegistration.id, "review")}
                      disabled={selectedRegistration.status === "review"}
                    >
                      Review
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => updateStatus(selectedRegistration.id, "rejected")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Tolak
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => updateStatus(selectedRegistration.id, "accepted")}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Terima
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminRegistrations;

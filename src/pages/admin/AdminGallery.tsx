import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ImageIcon,
  Video,
  Star,
  Upload,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery">;

const categories = [
  "Kegiatan Belajar",
  "Acara Sekolah",
  "Ekstrakulikuler",
  "Wisuda",
  "Kunjungan",
  "Lainnya",
];

const institutions = [
  { value: "dta", label: "DTA Arrasyd" },
  { value: "smp", label: "SMP Baet El Anshar" },
  { value: "sma", label: "SMA Baet El Anshar" },
  { value: "pesantren", label: "Pondok Pesantren" },
];

const AdminGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    institution: "",
    is_featured: false,
    media_type: "image" as "image" | "video",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

      await fetchItems();
    } catch (error) {
      console.error("Error:", error);
      navigate("/auth");
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !formData.title || !formData.category) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

      // Insert to database
      const { error: insertError } = await supabase
        .from("gallery")
        .insert({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          institution: formData.institution || null,
          is_featured: formData.is_featured,
          media_type: formData.media_type,
          media_url: urlData.publicUrl,
        } as any);

      if (insertError) throw insertError;

      toast({
        title: "Berhasil",
        description: "Item berhasil ditambahkan ke galeri",
      });

      setDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        institution: "",
        is_featured: false,
        media_type: "image",
      });
      setSelectedFile(null);
      await fetchItems();
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (id: string, mediaUrl: string) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;

    try {
      // Extract filename from URL
      const urlParts = mediaUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage.from("gallery").remove([fileName]);

      // Delete from database
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Item berhasil dihapus",
      });

      await fetchItems();
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        <title>Kelola Galeri - Admin</title>
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
                  Kelola Galeri
                </h1>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Item Galeri</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Judul *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul foto/video"
                      />
                    </div>
                    <div>
                      <Label>Deskripsi</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Deskripsi singkat"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Kategori *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) => setFormData({ ...formData, category: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Lembaga</Label>
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tipe Media</Label>
                        <Select
                          value={formData.media_type}
                          onValueChange={(v) => setFormData({ ...formData, media_type: v as "image" | "video" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Foto</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <Switch
                          checked={formData.is_featured}
                          onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
                        />
                        <Label>Tampilkan di Featured</Label>
                      </div>
                    </div>
                    <div>
                      <Label>File *</Label>
                      <div className="mt-2">
                        <input
                          type="file"
                          accept={formData.media_type === "image" ? "image/*" : "video/*"}
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedFile ? selectedFile.name : "Pilih file..."}
                          </span>
                        </label>
                      </div>
                    </div>
                    <Button onClick={handleSubmit} disabled={uploading} className="w-full">
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Mengupload...
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative group bg-card rounded-lg overflow-hidden border border-border">
                <div className="aspect-square relative">
                  {item.media_type === "video" ? (
                    <video src={item.media_url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteItem(item.id, item.media_url)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {item.is_featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    {item.media_type === "video" ? (
                      <Video className="w-5 h-5 text-white" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                </div>
              </div>
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada item di galeri
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminGallery;

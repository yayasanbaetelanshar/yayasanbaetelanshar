import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Play, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: "image" | "video";
  category: string;
  institution: string | null;
  is_featured: boolean;
  created_at: string;
}

const categories = [
  { value: "all", label: "Semua" },
  { value: "kegiatan", label: "Kegiatan Santri" },
  { value: "acara", label: "Acara Yayasan" },
  { value: "fasilitas", label: "Fasilitas" },
  { value: "prestasi", label: "Prestasi" },
];

// Sample gallery data for demo
const sampleGallery: GalleryItem[] = [
  {
    id: "1",
    title: "Wisuda Tahfidz 30 Juz",
    description: "Wisuda santri yang telah menyelesaikan hafalan 30 juz Al-Quran",
    media_url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800",
    media_type: "image",
    category: "acara",
    institution: "pesantren",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Pembelajaran di Kelas",
    description: "Suasana belajar mengajar di kelas SMP",
    media_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    media_type: "image",
    category: "kegiatan",
    institution: "smp",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Masjid Yayasan",
    description: "Masjid utama komplek Yayasan Baet El Anshar",
    media_url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800",
    media_type: "image",
    category: "fasilitas",
    institution: null,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Halaqah Tahfidz",
    description: "Santri mengikuti halaqah tahfidz pagi",
    media_url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800",
    media_type: "image",
    category: "kegiatan",
    institution: "pesantren",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Lomba MTQ",
    description: "Siswa meraih juara dalam lomba MTQ tingkat kabupaten",
    media_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    media_type: "image",
    category: "prestasi",
    institution: "sma",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Perpustakaan",
    description: "Perpustakaan Islam dengan koleksi lengkap",
    media_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    media_type: "image",
    category: "fasilitas",
    institution: null,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Upacara Bendera",
    description: "Upacara bendera hari Senin",
    media_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    media_type: "image",
    category: "kegiatan",
    institution: "smp",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Asrama Putra",
    description: "Asrama putra yang bersih dan nyaman",
    media_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    media_type: "image",
    category: "fasilitas",
    institution: "pesantren",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setGallery(data as GalleryItem[]);
        } else {
          // Use sample data if no data in database
          setGallery(sampleGallery);
        }
      } catch (err) {
        // Use sample data on error
        setGallery(sampleGallery);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredGallery =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Galeri - Yayasan Baet El Anshar</title>
        <meta name="description" content="Galeri foto dan video kegiatan santri, acara yayasan, dan fasilitas Yayasan Baet El Anshar" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary font-serif text-lg mb-2 block">Dokumentasi</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Galeri Foto & Video
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lihat dokumentasi kegiatan santri, acara yayasan, dan fasilitas yang tersedia di Yayasan Baet El Anshar.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-primary-foreground font-semibold">{item.title}</h3>
                      <p className="text-primary-foreground/80 text-sm line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.media_type === "video" && (
                    <div className="absolute top-4 right-4 w-10 h-10 bg-foreground/50 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  {item.is_featured && (
                    <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredGallery.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Tidak ada foto/video dalam kategori ini.</p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-4xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.media_type === "image" ? (
              <img
                src={selectedItem.media_url}
                alt={selectedItem.title}
                className="w-full rounded-xl"
              />
            ) : (
              <video
                src={selectedItem.media_url}
                controls
                className="w-full rounded-xl"
              />
            )}
            <div className="mt-4 text-center text-primary-foreground">
              <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-primary-foreground/80 mt-2">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;

import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import LogoBaetElAnshar from "@/assets/Logo yayasan.png"; // atau .svg / .webp

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo asli yayasan */}
              <img
                src={LogoBaetElAnshar}
                alt="Logo Yayasan Baet El Anshar"
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="font-serif text-2xl font-bold">Baet El Anshar</span>
              </div>
            </div>

            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              Yayasan Baet El Anshar berkomitmen untuk memberikan pendidikan Islam yang 
              berkualitas dan membentuk generasi Qur'ani yang berakhlak mulia.
            </p>

            <div className="flex gap-4">
              <a
                href="https://web.facebook.com/yayasanbaetelanshar/"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/baetelanshar_media?igsh=MTZvMW5ibm43ZTAxOQ=="
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@BaetElAnshar"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* ... bagian lainnya tetap sama ... */}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center">
              © {currentYear} Yayasan Baet El Anshar. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
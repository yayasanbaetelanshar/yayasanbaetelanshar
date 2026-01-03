<<<<<<< HEAD
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import LogoBaetElAnshar from "@/assets/logo yayasan.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <img
                src={LogoBaetElAnshar}
                alt="Logo Yayasan Baet El Anshar"
                className="w-full h-full object-contain"
              />
            </div>
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
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Lembaga Kami</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  DTA Arrasyd
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  SMP Baet El Anshar
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  SMA Baet El Anshar
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Pondok Pesantren Tahfidz
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className="text-sm">Jl. Pesantren No. 123, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone size={18} className="shrink-0" />
                <span className="text-sm">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail size={18} className="shrink-0" />
                <span className="text-sm">info@baetelanshar.or.id</span>
              </li>
            </ul>
          </div>
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
=======
import { Link } from "react-router-dom";
import { BookOpen, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { name: "DTA Arrasyd", href: "/lembaga/dta" },
  { name: "SMP Baet El Anshar", href: "/lembaga/smp" },
  { name: "SMA Baet El Anshar", href: "/lembaga/sma" },
  { name: "Pesantren Tahfidz", href: "/lembaga/pesantren" },
];

const infoLinks = [
  { name: "Tentang Yayasan", href: "/tentang" },
  { name: "Pendaftaran", href: "/pendaftaran" },
  { name: "Galeri", href: "/galeri" },
  { name: "Kontak", href: "/kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Islamic pattern overlay */}
      <div className="islamic-pattern">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Baet El Anshar</h3>
                  <p className="text-sm text-primary-foreground/80">Yayasan Pendidikan Islam</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Membentuk generasi Qurani yang berakhlak mulia, berwawasan luas, 
                dan siap menjadi pemimpin umat.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">Lembaga Pendidikan</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Links */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">Informasi</h4>
              <ul className="space-y-3">
                {infoLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">
                    Jl. Pendidikan Islam No. 123<br />
                    Kota, Provinsi 12345
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">(021) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">info@baetelanshar.sch.id</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-primary-foreground/60 text-sm">
                © {new Date().getFullYear()} Yayasan Baet El Anshar. Hak Cipta Dilindungi.
              </p>
              <p className="text-primary-foreground/60 text-sm">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
};

export default Footer;
=======
}
>>>>>>> 057e83a2113d2a394c2f301a98efc4cb236e1711

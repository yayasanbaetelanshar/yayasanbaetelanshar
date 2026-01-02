import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Kp. Pasir Awi Rt 11/003 Desa Palasari Girang Kecamatan Kalapanunggal Kabupaten Sukabumi Provinsi Jawa Barat",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "+62 857-2300-6453",
  },
  {
    icon: Mail,
    title: "Email",
    content: "yayasanbaetelanshar2@gmail.com",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    content: "Senin - Sabtu: 07:00 - 15:00 WIB",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Nama, email, dan pesan wajib diisi!");
      return;
    }

    const text = `
Assalamualaikum, Perkenalkan

Nama: ${formData.name}
Email: ${formData.email}
No. Telepon: ${formData.phone || "-"}
ingin Bertanya
${formData.message}
    `.trim();

    const encodedText = encodeURIComponent(text);
    const phoneNumber = "6285975213222"; // Nomor tujuan: 085975213222

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, "_blank");

    // Optional: beri notifikasi
    alert("Pesan sedang dibuka di WhatsApp. Silakan lanjutkan chat di sana.");

    // Optional: reset form setelah submit
    // setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="kontak" className="py-20 md:py-32 bg-background geometric-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-secondary font-serif text-lg mb-2 block">Hubungi Kami</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kami Siap Membantu Anda
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Silahkan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran, program pendidikan, atau pertanyaan lainnya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  <p className="text-muted-foreground">{info.content}</p>
                </div>
              </div>
            ))}

            {/* Google Maps */}
            <div className="w-full h-64 rounded-xl bg-muted overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6644189082276!2d106.65402807472918!3d-6.810610993186967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e682d80c627d91d%3A0x5437a59349d527d6!2sPondok%20Pesantren%20Tahfidz%20Qur&#39;an%20Yayasan%20Baet%20El%20Anshar!5e0!3m2!1sid!2sid!4v1767357724355!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Yayasan Baet El Anshar"
              />
            </div>
          </div>

          {/* Contact Form - Kirim ke WhatsApp */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="email@contoh.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="08xx xxxx xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pesan
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InstitutionsSection from "@/components/InstitutionsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Yayasan Baet El Anshar - Pendidikan Islam Berkualitas</title>
        <meta
          name="description"
          content="Yayasan Baet El Anshar menaungi DTA Arrasyd, SMP Baet El Anshar, SMA Baet El Anshar, dan Pondok Pesantren Tahfidz Quran. Membentuk generasi Qur'ani yang berilmu dan berakhlak mulia."
        />
        <meta
          name="keywords"
          content="Yayasan Baet El Anshar, Pesantren, Tahfidz Quran, DTA Arrasyd, SMP Islam, SMA Islam, Pendidikan Islam"
        />
        <link rel="canonical" href="https://baetelanshar.or.id" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <InstitutionsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;

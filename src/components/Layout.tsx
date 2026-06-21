import { Outlet } from 'react-router-dom';
import { Seo } from '../seo/Seo';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { MobileCTABar } from './layout/MobileCTABar';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy-900" dir="rtl" lang="ar">
      <Seo />
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}

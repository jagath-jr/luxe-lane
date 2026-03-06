import './globals.css';
import Navbar from '@/components/layout/Navbar';
// 1. Import the Footer component
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Luxe Lane | E-commerce Store',
  description: 'Shop the latest in Men, Women, and Kids clothing.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main Content Wrapper - Flex grow ensures footer is pushed to bottom if page content is short */}
        <main className="pt-20 flex-grow">
          {children}
        </main>
        
        {/* 2. Place Footer here so it renders on every page */}
        <Footer />
        
      </body>
    </html>
  );
}
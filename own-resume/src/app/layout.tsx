import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ownResume - Éditeur de CV interactif',
  description: 'Créez, personnalisez et exportez vos CV professionnels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p> {new Date().getFullYear()} ownResume : <a href='https://github.com/Norzolrat/ownResume'> github.com/Norzolrat/ownResume</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
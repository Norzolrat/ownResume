import Link from 'next/link';

export default function CVsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes CV</h1>
        <Link
          href="/cvs/new"
          className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Nouveau CV
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-600 mb-6">Vous n'avez pas encore créé de CV.</p>
        <Link 
          href="/cvs/new" 
          className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Créer mon premier CV
        </Link>
      </div>
    </div>
  );
}
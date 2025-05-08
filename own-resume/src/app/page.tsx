import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Créez votre CV professionnel avec ownResume
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Une solution complète pour créer, personnaliser et exporter vos CV en quelques clics
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/cvs"
            className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition text-center"
          >
            Gérer mes CV
          </Link>
          <Link
            href="/templates"
            className="px-6 py-3 bg-white text-primary border border-primary rounded-md font-medium hover:bg-gray-50 transition text-center"
          >
            Explorer les templates
          </Link>
          <Link
            href="/resume/example-cv"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition text-center"
          >
            Voir un exemple
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
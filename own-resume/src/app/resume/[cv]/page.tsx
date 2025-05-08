import Link from 'next/link';

// Cette page affiche un CV spécifique
export default function ResumePage({ params }: { params: { cv: string } }) {
  const cvId = params.cv;
  
  // Pour l'exemple, nous afficherons simplement une maquette
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Aperçu du CV</h1>
        <div className="flex space-x-3">
          <Link
            href="/cvs"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Retour
          </Link>
          <Link
            href={`/resume/${cvId}/pdf`}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Télécharger PDF
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
          {/* En-tête du CV */}
          <div className="bg-primary text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Sophie Dubois</h2>
            <p className="text-lg">Développeuse Full Stack</p>
            <div className="mt-2 text-sm">
              <span className="mx-2">sophie.dubois@example.com</span>
              <span className="mx-2">+33 6 12 34 56 78</span>
              <span className="mx-2">Lyon, France</span>
            </div>
          </div>
          
          {/* Corps du CV */}
          <div className="p-6">
            {/* Expérience */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-primary border-b border-gray-200 pb-2 mb-3">
                Expérience professionnelle
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Développeuse senior</h4>
                  <span className="text-gray-600">2019-2023</span>
                </div>
                <p className="text-gray-800 italic">TechSolutions</p>
                <p className="text-gray-600 mt-1">
                  Développement d'applications web avec React et Node.js. Mise en place d'architecture microservices.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <h4 className="font-semibold">Développeuse front-end</h4>
                  <span className="text-gray-600">2016-2019</span>
                </div>
                <p className="text-gray-800 italic">WebCreative</p>
                <p className="text-gray-600 mt-1">
                  Création d'interfaces utilisateur réactives et accessibles avec Vue.js.
                </p>
              </div>
            </div>
            
            {/* Formation */}
            <div>
              <h3 className="text-lg font-bold text-primary border-b border-gray-200 pb-2 mb-3">
                Formation
              </h3>
              
              <div className="mb-2">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Master en Développement Web</h4>
                  <span className="text-gray-600">2014-2016</span>
                </div>
                <p className="text-gray-800 italic">Université de Lyon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
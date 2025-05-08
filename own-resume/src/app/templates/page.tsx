import Link from 'next/link';

export default function TemplatesPage() {
  // Exemples de templates
  const templates = [
    { 
      id: 'modern',
      name: 'Moderne', 
      description: 'Design épuré avec accents de couleur',
      color: '#16a085'
    },
    { 
      id: 'minimal',
      name: 'Minimaliste', 
      description: 'Simple et professionnel',
      color: '#2c3e50'
    },
    { 
      id: 'creative',
      name: 'Créatif', 
      description: 'Design unique pour se démarquer',
      color: '#8e44ad'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Templates de CV</h1>
        <Link
          href="/templates/new"
          className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Nouveau template
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="h-32 flex items-center justify-center" 
              style={{ backgroundColor: template.color }}
            >
              <span className="text-white font-bold text-xl">{template.name}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between">
                <Link
                  href={`/templates/edit/${template.id}`}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  Éditer
                </Link>
                <Link
                  href={`/templates/preview/${template.id}`}
                  className="px-3 py-1 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  Aperçu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}